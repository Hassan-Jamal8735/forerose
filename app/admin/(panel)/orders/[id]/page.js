import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getOrder, getSettings } from '@/lib/db';
import { money } from '@/lib/format';
import OrderActions from './OrderActions';

export default async function OrderDetail({ params }) {
  const { id } = await params;
  const [o, s] = await Promise.all([getOrder(id), getSettings()]);
  if (!o) notFound();
  const c = o.customer;
  const phone = c.phone.replace(/\D/g, '').replace(/^0/, '92');

  return (
    <>
      <div className="admin-top">
        <div>
          <Link href="/admin/orders" className="muted">← Orders</Link>
          <h1 style={{ marginTop: '0.4rem' }}>Order #{o.number}</h1>
          <span className="muted">{new Date(o.createdAt).toLocaleString()} · {o.payment}</span>
        </div>
        <span className={`pill ${o.status}`} style={{ fontSize: '0.9rem' }}>{o.status}</span>
      </div>
      <div className="order-detail">
        <div className="admin-form">
          <h3>Items</h3>
          <table>
            <tbody>
              {o.items.map((i) => (
                <tr key={i.id}>
                  <td><img src={i.image} alt="" /></td>
                  <td>{i.name}<div className="muted" style={{ fontSize: '0.8rem' }}>{i.size}</div></td>
                  <td>{money(i.price, s.currency)} × {i.qty}</td>
                  <td><b>{money(i.price * i.qty, s.currency)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '1rem' }}>
            <div className="sum-row"><span>Subtotal</span><span>{money(o.subtotal, s.currency)}</span></div>
            <div className="sum-row"><span>Delivery</span><span>{money(o.shipping, s.currency)}</span></div>
            <div className="sum-row total"><span>Cash to collect</span><span>{money(o.total, s.currency)}</span></div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="admin-form">
            <h3>Customer</h3>
            <p style={{ margin: 0 }}><b>{c.name}</b></p>
            <p style={{ margin: '0.3rem 0' }}>
              <a href={`tel:${c.phone}`}>{c.phone}</a> · <a href={`https://wa.me/${phone}`} target="_blank" style={{ color: 'var(--ok)' }}>WhatsApp</a>
            </p>
            {c.email && <p style={{ margin: '0.3rem 0' }}>{c.email}</p>}
            <p style={{ margin: '0.6rem 0 0' }}>{c.address}<br />{c.city} {c.postal}</p>
            {c.notes && <p className="notice" style={{ marginTop: '1rem', marginBottom: 0 }}>Note: {c.notes}</p>}
          </div>
          <OrderActions order={o} />
        </div>
      </div>
    </>
  );
}
