import { isAdmin, unauthorized } from '@/lib/auth';
import { listProducts, getProduct, saveProduct, slugify } from '@/lib/db';
import { normalizeProduct } from './normalize';

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  return Response.json(await listProducts({ includeInactive: true }));
}

export async function POST(req) {
  if (!(await isAdmin())) return unauthorized();
  const data = normalizeProduct(await req.json());
  if (!data.name) return Response.json({ error: 'Name is required' }, { status: 400 });

  let id = slugify(data.slug || data.name) || `p-${Date.now()}`;
  if (await getProduct(id)) id = `${id}-${Date.now().toString(36)}`;
  const product = { ...data, id, slug: id, createdAt: Date.now() };
  await saveProduct(product);
  return Response.json(product);
}
