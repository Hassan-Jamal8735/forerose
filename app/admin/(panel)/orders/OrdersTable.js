'use client';
import { useState } from 'react';
import Link from 'next/link';
import { money, ORDER_STATUSES } from '@/lib/format';

export default function OrdersTable({ initial, currency, compact }) {
  const [orders, setOrders] = useState(initial);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  async function setStatus(id, status) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((cur) => cur.map((o) => (o.id === id ? updated : o)));
    } else alert('Could not update order');
  }

  async function remove(id) {
    if (!confirm('Delete this order permanently?')) return;
    const res = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    if (res.ok) setOrders((cur) => cur.filter((o) => o.id !== id));
  }

  const term = q.trim().toLowerCase();
  const shown = orders.filter(
    (o) =>
      (filter === 'all' || o.status === filter) &&
      (!term || [o.number, o.customer.name, o.customer.phone, o.customer.city].join(' ').toLowerCase().includes(term))
  );

  return (
    <>
      {!compact && (
        <div className="filters">
          {['all', ...ORDER_STATUSES].map((s) => (
            <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>
              {s} ({s === 'all' ? orders.length : orders.filter((o) => o.status === s).length})
            </button>
          ))}
          <input
            placeholder="Search name, phone, order #"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ marginLeft: 'auto', padding: '0.45rem 0.9rem', border: '1px solid var(--stone)', borderRadius: 999, font: 'inherit' }}
          />
        </div>
      )}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th><th>Date</th><th>Customer</th><th>City</th><th>Items</th><th>Total (COD)</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((o) => (
              <tr key={o.id}>
                <td><Link href={`/admin/orders/${o.id}`}><b>#{o.number}</b></Link></td>
                <td style={{ whiteSpace: 'nowrap' }}>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.customer.name}<div className="muted" style={{ fontSize: '0.8rem' }}>{o.customer.phone}</div></td>
                <td>{o.customer.city}</td>
                <td>{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                <td><b>{money(o.total, currency)}</b></td>
                <td>
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value)} className={`pill ${o.status}`} style={{ border: 'none', cursor: 'pointer' }}>
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="actions">
                  <Link href={`/admin/orders/${o.id}`} className="btn small outline">View</Link>
                  {!compact && <button className="btn small danger" onClick={() => remove(o.id)}>Delete</button>}
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr><td colSpan={8} className="center muted" style={{ padding: '2.5rem' }}>No orders yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
