import Link from 'next/link';
import { listOrders, listProducts, getSettings } from '@/lib/db';
import { money } from '@/lib/format';
import OrdersTable from './orders/OrdersTable';

export default async function Dashboard() {
  const [orders, products, s] = await Promise.all([listOrders(), listProducts({ includeInactive: true }), getSettings()]);
  const live = orders.filter((o) => o.status !== 'cancelled');
  const revenue = orders.filter((o) => o.status === 'delivered').reduce((sum, o) => sum + o.total, 0);
  const pendingCash = live.filter((o) => o.status !== 'delivered').reduce((sum, o) => sum + o.total, 0);
  const lowStock = products.filter((p) => p.stock < 10);

  return (
    <>
      <div className="admin-top"><h1>Dashboard</h1></div>
      <div className="stats">
        <div className="stat"><span>Total orders</span><b>{orders.length}</b></div>
        <div className="stat"><span>Pending</span><b>{orders.filter((o) => o.status === 'pending').length}</b></div>
        <div className="stat"><span>Cash collected</span><b>{money(revenue, s.currency)}</b></div>
        <div className="stat"><span>COD to collect</span><b>{money(pendingCash, s.currency)}</b></div>
        <div className="stat"><span>Products</span><b>{products.length}</b></div>
      </div>
      {lowStock.length > 0 && (
        <div className="notice">
          Low stock: {lowStock.map((p) => `${p.name} (${p.stock})`).join(', ')}. <Link href="/admin/products"><u>Update stock</u></Link>
        </div>
      )}
      <div className="admin-top">
        <h2 style={{ margin: 0 }}>Recent orders</h2>
        <Link href="/admin/orders" className="btn small outline">All orders</Link>
      </div>
      <OrdersTable initial={orders.slice(0, 8)} currency={s.currency} compact />
    </>
  );
}
