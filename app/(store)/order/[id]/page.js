import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrder, getSettings } from '@/lib/db';
import { money } from '@/lib/format';
import { CheckIcon } from '@/components/Icons';

export const metadata = { title: 'Order confirmed | Forerose' };

const STEPS = ['pending', 'confirmed', 'shipped', 'delivered'];
const LABELS = { pending: 'Placed', confirmed: 'Confirmed', shipped: 'On the way', delivered: 'Delivered' };

export default async function OrderPage({ params, searchParams }) {
  const { id } = await params;
  const { t } = await searchParams;
  const [order, settings] = await Promise.all([getOrder(id), getSettings()]);
  if (!order || order.token !== t) notFound();
  const cur = settings.currency;
  const at = STEPS.indexOf(order.status);

  return (
    <div className="container section">
      <div className="panel success-box">
        <div className="check"><CheckIcon /></div>
        <span className="eyebrow">Thank you, {order.customer.name}</span>
        <h1 style={{ marginTop: '0.8rem', fontSize: 'clamp(2.4rem,5vw,3.4rem)' }}>
          {order.status === 'cancelled' ? 'This order was cancelled' : 'Your order is placed'}
        </h1>
        <p className="muted">
          Order <b>#{order.number}</b>. We will call you on <b>{order.customer.phone}</b> to confirm. Please keep{' '}
          <b>{money(order.total, cur)}</b> in cash ready when it arrives.
        </p>
        {order.status !== 'cancelled' && (
          <div className="timeline">
            {STEPS.map((s, i) => (
              <div key={s} className={i <= at ? 'on' : ''}><i>{i <= at ? '✓' : i + 1}</i>{LABELS[s]}</div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'left', margin: '1rem 0 2rem' }}>
          {order.items.map((i) => (
            <div className="sum-row" key={i.id}><span>{i.name} × {i.qty}</span><span>{money(i.price * i.qty, cur)}</span></div>
          ))}
          <div className="sum-row"><span>Delivery</span><span>{order.shipping ? money(order.shipping, cur) : 'Free'}</span></div>
          <div className="sum-row total"><span>Total (Cash on Delivery)</span><span>{money(order.total, cur)}</span></div>
          <p className="muted" style={{ fontSize: '0.9rem' }}>
            Deliver to: {order.customer.address}, {order.customer.city}
          </p>
        </div>
        <Link href="/" className="btn">Continue shopping</Link>
      </div>
    </div>
  );
}
