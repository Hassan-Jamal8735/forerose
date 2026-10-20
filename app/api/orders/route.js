import crypto from 'crypto';
import { getProduct, saveProduct, saveOrder, getSettings } from '@/lib/db';

const clean = (v, max = 300) => String(v ?? '').trim().slice(0, max);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const c = body.customer || {};
  const customer = {
    name: clean(c.name, 100), phone: clean(c.phone, 20), email: clean(c.email, 120),
    address: clean(c.address, 400), city: clean(c.city, 80), postal: clean(c.postal, 20), notes: clean(c.notes, 500),
  };
  if (customer.name.length < 2 || !/^[0-9+\-\s]{10,15}$/.test(customer.phone) || customer.address.length < 5 || !customer.city)
    return Response.json({ error: 'Please fill in your name, phone, address and city.' }, { status: 400 });

  const wanted = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  if (!wanted.length) return Response.json({ error: 'Your bag is empty' }, { status: 400 });

  // Prices and stock always come from the database, never from the client.
  const items = [];
  const touched = [];
  for (const w of wanted) {
    const qty = Math.floor(Number(w.qty));
    const p = await getProduct(String(w.id));
    if (!p || !p.active || !(qty > 0)) return Response.json({ error: 'A product in your bag is no longer available.' }, { status: 400 });
    if (p.stock < qty) return Response.json({ error: `Only ${p.stock} of ${p.name} left in stock.` }, { status: 400 });
    items.push({ id: p.id, name: p.name, size: p.size, image: p.image, price: p.price, qty });
    touched.push({ ...p, stock: p.stock - qty });
  }

  const settings = await getSettings();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = settings.freeDeliveryOver && subtotal >= settings.freeDeliveryOver ? 0 : Number(settings.deliveryFee) || 0;

  const order = {
    id: crypto.randomUUID(),
    token: crypto.randomBytes(12).toString('hex'),
    number: `FR${Date.now().toString().slice(-7)}`,
    customer, items, subtotal, shipping, total: subtotal + shipping,
    payment: 'Cash on Delivery', status: 'pending',
    createdAt: Date.now(),
  };

  for (const p of touched) await saveProduct(p);
  await saveOrder(order);
  return Response.json({ id: order.id, token: order.token, number: order.number });
}
