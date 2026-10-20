import { Redis } from '@upstash/redis';
import { promises as fs } from 'fs';
import path from 'path';
import { seedProducts, defaultSettings } from './seed';

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const usingRedis = !!redis;

// ---- Local JSON fallback (development only) ----
const FILE = path.join(process.cwd(), 'data', 'db.json');
let memory = null;

async function readLocal() {
  // re-read each time locally: Next may run pages and API routes in separate workers
  if (memory && process.env.VERCEL) return memory;
  try {
    memory = JSON.parse(await fs.readFile(FILE, 'utf8'));
  } catch {
    memory = { products: {}, orders: {}, settings: null, seeded: false };
  }
  return memory;
}
async function writeLocal() {
  if (process.env.VERCEL) return; // read-only filesystem on Vercel: memory only
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(memory, null, 2));
}

const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v || null);

async function ensureSeeded() {
  if (redis) {
    if (await redis.get('seeded')) return;
    await redis.hset('products', Object.fromEntries(seedProducts.map((p) => [p.id, p])));
    await redis.set('seeded', 1);
  } else {
    const db = await readLocal();
    if (db.seeded) return;
    for (const p of seedProducts) db.products[p.id] = p;
    db.seeded = true;
    await writeLocal();
  }
}

async function getAll(key) {
  await ensureSeeded();
  if (redis) return Object.values((await redis.hgetall(key)) || {}).map(parse);
  return Object.values((await readLocal())[key]);
}
async function getOne(key, id) {
  await ensureSeeded();
  if (redis) return parse(await redis.hget(key, id));
  return (await readLocal())[key][id] || null;
}
async function put(key, item) {
  await ensureSeeded();
  if (redis) await redis.hset(key, { [item.id]: item });
  else {
    (await readLocal())[key][item.id] = item;
    await writeLocal();
  }
  return item;
}
async function remove(key, id) {
  if (redis) await redis.hdel(key, id);
  else {
    delete (await readLocal())[key][id];
    await writeLocal();
  }
}

// ---- Products ----
export async function listProducts({ includeInactive = false } = {}) {
  const all = await getAll('products');
  return all.filter((p) => includeInactive || p.active).sort((a, b) => b.createdAt - a.createdAt);
}
export const getProduct = (id) => getOne('products', id);
export async function getProductBySlug(slug) {
  return (await listProducts()).find((p) => p.slug === slug) || null;
}
export const saveProduct = (p) => put('products', p);
export const deleteProduct = (id) => remove('products', id);

// ---- Orders ----
export async function listOrders() {
  return (await getAll('orders')).sort((a, b) => b.createdAt - a.createdAt);
}
export const getOrder = (id) => getOne('orders', id);
export const saveOrder = (o) => put('orders', o);
export const deleteOrder = (id) => remove('orders', id);

// ---- Settings ----
export async function getSettings() {
  const stored = redis ? await redis.get('settings') : (await readLocal()).settings;
  return { ...defaultSettings, ...(parse(stored) || {}) };
}
export async function saveSettings(s) {
  if (redis) await redis.set('settings', s);
  else {
    (await readLocal()).settings = s;
    await writeLocal();
  }
  return s;
}

export function slugify(s) {
  return String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
