'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { CashIcon } from '@/components/Icons';
import { money } from '@/lib/format';

export default function CheckoutForm({ currency, deliveryFee, freeDeliveryOver }) {
  const { items, loaded, subtotal, clear } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!loaded) return null;
  if (items.length === 0)
    return (
      <div className="empty">
        <h1>Your bag is empty</h1>
        <Link href="/#shop" className="btn" style={{ marginTop: '1rem' }}>Shop fragrances</Link>
      </div>
    );

  const shipping = freeDeliveryOver && subtotal >= freeDeliveryOver ? 0 : deliveryFee;

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const customer = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, items: items.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not place order');
      clear();
      router.push(`/order/${data.id}?t=${data.token}`);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="page-title"><h1>Checkout</h1></div>
      <form className="two-col" onSubmit={submit}>
        <div className="panel">
          <h3 style={{ fontSize: '1.6rem' }}>Delivery details</h3>
          <div className="field"><label>Full name *</label><input name="name" required minLength={2} /></div>
          <div className="row2">
            <div className="field"><label>Phone *</label><input name="phone" type="tel" required pattern="[0-9+\-\s]{10,15}" placeholder="03XX XXXXXXX" /></div>
            <div className="field"><label>Email (optional)</label><input name="email" type="email" /></div>
          </div>
          <div className="field"><label>Address *</label><textarea name="address" rows={2} required minLength={5} /></div>
          <div className="row2">
            <div className="field"><label>City *</label><input name="city" required /></div>
            <div className="field"><label>Postal code</label><input name="postal" /></div>
          </div>
          <div className="field"><label>Order notes</label><textarea name="notes" rows={2} placeholder="Anything we should know?" /></div>

          <h3 style={{ fontSize: '1.6rem', marginTop: '1.5rem' }}>Payment</h3>
          <label className="pay-option">
            <input type="radio" name="payment" value="cod" defaultChecked readOnly />
            <CashIcon />
            <div>
              <b>Cash on Delivery</b>
              <div className="muted" style={{ fontSize: '0.85rem' }}>Pay in cash when your order arrives at your door.</div>
            </div>
          </label>
        </div>

        <div className="panel">
          <h3 style={{ fontSize: '1.6rem' }}>Your order</h3>
          {items.map((i) => (
            <div className="sum-row" key={i.id}>
              <span>{i.name} × {i.qty}</span><span>{money(i.price * i.qty, currency)}</span>
            </div>
          ))}
          <div className="sum-row" style={{ borderTop: '1px solid var(--sand)', marginTop: '0.5rem', paddingTop: '0.8rem' }}>
            <span>Subtotal</span><span>{money(subtotal, currency)}</span>
          </div>
          <div className="sum-row"><span>Delivery</span><span>{shipping ? money(shipping, currency) : 'Free'}</span></div>
          <div className="sum-row total"><span>Total (pay on delivery)</span><span>{money(subtotal + shipping, currency)}</span></div>
          {error && <p className="error">{error}</p>}
          <button className="btn block" style={{ marginTop: '1.2rem' }} disabled={busy}>
            {busy ? 'Placing order…' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  );
}
