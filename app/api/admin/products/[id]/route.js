import { isAdmin, unauthorized } from '@/lib/auth';
import { getProduct, saveProduct, deleteProduct } from '@/lib/db';
import { normalizeProduct } from '../normalize';

export async function PUT(req, { params }) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await params;
  const existing = await getProduct(id);
  if (!existing) return Response.json({ error: 'Not found' }, { status: 404 });
  const data = normalizeProduct(await req.json());
  if (!data.name) return Response.json({ error: 'Name is required' }, { status: 400 });
  // id and slug stay fixed so existing links keep working
  const product = { ...existing, ...data, id, slug: existing.slug };
  await saveProduct(product);
  return Response.json(product);
}

export async function DELETE(_req, { params }) {
  if (!(await isAdmin())) return unauthorized();
  await deleteProduct((await params).id);
  return Response.json({ ok: true });
}
