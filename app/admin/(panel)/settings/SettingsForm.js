'use client';
import { useState } from 'react';

export default function SettingsForm({ initial }) {
  const [s, setS] = useState(initial);
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setS({ ...s, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/settings', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s),
    });
    setMsg(res.ok ? 'Saved ✓' : 'Could not save');
    setTimeout(() => setMsg(''), 2500);
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="row2">
        <div className="field"><label>Currency symbol</label><input value={s.currency} onChange={set('currency')} /></div>
        <div className="field"><label>WhatsApp number</label><input value={s.whatsapp} onChange={set('whatsapp')} placeholder="923001234567" /></div>
      </div>
      <div className="row2">
        <div className="field"><label>Delivery fee</label><input type="number" min="0" value={s.deliveryFee} onChange={set('deliveryFee')} /></div>
        <div className="field"><label>Free delivery over (0 = never)</label><input type="number" min="0" value={s.freeDeliveryOver} onChange={set('freeDeliveryOver')} /></div>
      </div>
      <div className="field"><label>Announcement bar</label><input value={s.announcement} onChange={set('announcement')} /></div>
      <div className="actions" style={{ alignItems: 'center' }}>
        <button className="btn">Save settings</button>
        <span className="muted">{msg}</span>
      </div>
    </form>
  );
}
