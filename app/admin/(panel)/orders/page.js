import { listOrders, getSettings } from '@/lib/db';
import OrdersTable from './OrdersTable';

export default async function OrdersPage() {
  const [orders, s] = await Promise.all([listOrders(), getSettings()]);
  return (
    <>
      <div className="admin-top"><h1>Orders</h1></div>
      <OrdersTable initial={orders} currency={s.currency} />
    </>
  );
}
