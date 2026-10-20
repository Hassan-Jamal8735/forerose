import { checkPassword, createSession, destroySession } from '@/lib/auth';

export async function POST(req) {
  const { password } = await req.json().catch(() => ({}));
  if (!checkPassword(password || '')) return Response.json({ error: 'Wrong password' }, { status: 401 });
  await createSession();
  return Response.json({ ok: true });
}

export async function DELETE() {
  await destroySession();
  return Response.json({ ok: true });
}
