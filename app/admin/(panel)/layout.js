import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { usingRedis } from '@/lib/db';
import { Logo } from '@/components/Header';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin | Forerose' };

export default async function AdminLayout({ children }) {
  if (!(await isAdmin())) redirect('/admin/login');
  return (
    <div className="admin">
      <aside className="admin-side">
        <div>
          <Logo />
          <small>Admin</small>
        </div>
        <nav>
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/settings">Settings</Link>
          <Link href="/" target="_blank">View store ↗</Link>
        </nav>
        <LogoutButton />
      </aside>
      <section className="admin-main">
        {!usingRedis && process.env.VERCEL && (
          <div className="notice">
            <b>No database connected.</b> Changes and orders will not be saved. In Vercel, open your project →
            Storage → connect an <b>Upstash Redis</b> database, then redeploy.
          </div>
        )}
        {children}
      </section>
    </div>
  );
}
