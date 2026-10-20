import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/db';
import { money } from '@/lib/format';

export const metadata = { title: 'Order confirmed | Forerose' };

export default async function OrderPage({ params, searchParams }) {
  const { id } = await params;
  const { t } = await searchParams;
  const order = await getOrder(id);
  if (!order || order.token !== t) notFound();

  return (
    <div className="container section">
      <div className="panel success-box">
        <div className="check">✓</div>
        <span className="eyebrow">Thank you, {order.customer.name}</span>
        <h1 style={{ marginTop: '0.8rem' }}>Your order is placed</h1>
        <p className="muted">
          Order <b>#{order.number}</b>. We will call you on <b>{order.customer.phone}</b> to confirm. Please keep{' '}
          <b>{money(order.total)}</b> in cash ready when it arrives.
        </p>
        <div style={{ textAlign: 'left', margin: '2rem 0' }}>
          {order.items.map((i) => (
            <div className="sum-row" key={i.id}><span>{i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></div>
          ))}
          <div className="sum-row"><span>Delivery</span><span>{order.shipping ? money(order.shipping) : 'Free'}</span></div>
          <div className="sum-row total"><span>Total (Cash on Delivery)</span><span>{money(order.total)}</span></div>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            Deliver to: {order.customer.address}, {order.customer.city}
          </p>
        </div>
        <Link href="/" className="btn">Continue shopping</Link>
      </div>
    </div>
  );
}
