'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ORDER_STATUSES } from '@/lib/format';

export default function OrderActions({ order }) {
  const router = useRouter();
  const [status, setStatus] = useState(order.status);
  const [note, setNote] = useState(order.adminNote || '');
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    const res = await fetch(`/api/admin/orders/${order.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNote: note }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert('Could not save');
  }

  async function remove() {
    if (!confirm('Delete this order permanently?')) return;
    await fetch(`/api/admin/orders/${order.id}`, { method: 'DELETE' });
    router.push('/admin/orders');
    router.refresh();
  }

  return (
    <div className="admin-form">
      <h3>Manage</h3>
      <div className="field">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Internal note</label>
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Courier, tracking no., etc." />
      </div>
      <div className="actions">
        <button className="btn small" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
        <button className="btn small danger" onClick={remove}>Delete order</button>
      </div>
      {order.history?.length > 0 && (
        <div className="muted" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
          {order.history.map((h, i) => <div key={i}>{new Date(h.at).toLocaleString()}: {h.status}</div>)}
        </div>
      )}
    </div>
  );
}
