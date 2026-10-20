import { cookies } from 'next/headers';
import crypto from 'crypto';

const COOKIE = 'forerose_admin';
const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('hex');
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

export function checkPassword(pw) {
  return safeEqual(pw, process.env.ADMIN_PASSWORD || 'admin123');
}

export async function createSession() {
  const exp = String(Date.now() + 7 * 24 * 3600 * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 3600,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return false;
  const [exp, sig] = v.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}

export const unauthorized = () => Response.json({ error: 'Unauthorized' }, { status: 401 });
