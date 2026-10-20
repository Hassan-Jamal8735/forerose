import { put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';
import { isAdmin, unauthorized } from '@/lib/auth';

export async function POST(req) {
  if (!(await isAdmin())) return unauthorized();
  const file = (await req.formData()).get('file');
  if (!file || typeof file === 'string') return Response.json({ error: 'No file' }, { status: 400 });
  if (!file.type.startsWith('image/')) return Response.json({ error: 'Only images allowed' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return Response.json({ error: 'Max 4 MB' }, { status: 400 });

  const name = `products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, file, { access: 'public' });
    return Response.json({ url: blob.url });
  }
  if (process.env.VERCEL)
    return Response.json({ error: 'Image upload needs a Vercel Blob store. Paste an image URL instead.' }, { status: 500 });

  // local development: save into /public/uploads
  const dest = path.join(process.cwd(), 'public', 'uploads', path.basename(name));
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${path.basename(name)}` });
}
