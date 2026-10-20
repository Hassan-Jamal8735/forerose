import { isAdmin, unauthorized } from '@/lib/auth';
import { getOrder, saveOrder, deleteOrder, getProduct, saveProduct } from '@/lib/db';
import { ORDER_STATUSES } from '@/lib/format';

async function adjustStock(items, sign) {
  for (const i of items) {
    const p = await getProduct(i.id);
    if (p) await saveProduct({ ...p, stock: Math.max(0, p.stock + sign * i.qty) });
  }
}

export async function PATCH(req, { params }) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: 'Not found' }, { status: 404 });
  const { status, adminNote } = await req.json();

  if (status !== undefined) {
    if (!ORDER_STATUSES.includes(status)) return Response.json({ error: 'Bad status' }, { status: 400 });
    // put stock back when an order is cancelled, take it again if un-cancelled
    if (status === 'cancelled' && order.status !== 'cancelled') await adjustStock(order.items, +1);
    if (status !== 'cancelled' && order.status === 'cancelled') await adjustStock(order.items, -1);
    order.status = status;
    order.history = [...(order.history || []), { status, at: Date.now() }];
  }
  if (adminNote !== undefined) order.adminNote = String(adminNote).slice(0, 1000);
  await saveOrder(order);
  return Response.json(order);
}

export async function DELETE(_req, { params }) {
  if (!(await isAdmin())) return unauthorized();
  await deleteOrder((await params).id);
  return Response.json({ ok: true });
}
