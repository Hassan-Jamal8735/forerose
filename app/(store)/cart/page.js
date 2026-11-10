'use client';
import Link from 'next/link';
import { useCart, ShipMeter } from '@/components/CartProvider';
import { CashIcon, ShieldIcon, PhoneIcon } from '@/components/Icons';
import { money } from '@/lib/format';

export default function CartPage() {
  const { items, loaded, setQty, remove, subtotal, currency, freeDeliveryOver } = useCart();
  if (!loaded) return null;

  if (items.length === 0)
    return (
      <div className="empty">
        <span className="eyebrow">Your bag</span>
        <h1 style={{ marginTop: '0.8rem' }}>Nothing here yet</h1>
        <p className="muted">Find your signature scent from our collection.</p>
        <Link href="/#shop" className="btn" style={{ marginTop: '1rem' }}>Shop fragrances</Link>
      </div>
    );

  return (
    <div className="container">
      <div className="page-title">
        <span className="eyebrow">Step 1 of 2</span>
        <h1>Your Bag</h1>
      </div>
      <div className="two-col">
        <div className="panel">
          <ShipMeter subtotal={subtotal} freeOver={freeDeliveryOver} currency={currency} />
          {items.map((i) => (
            <div className="line" key={i.id}>
              <img src={i.image} alt={i.name} />
              <div>
                <Link href={`/product/${i.slug}`}><h4>{i.name}</h4></Link>
                <div className="meta">{i.size} · {money(i.price, currency)}</div>
                <div className="ctrl">
                  <div className="qty sm">
                    <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">+</button>
                  </div>
                  <button className="link-btn" onClick={() => remove(i.id)}>Remove</button>
                </div>
              </div>
              <b>{money(i.price * i.qty, currency)}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3>Summary</h3>
          <div className="sum-row"><span>Subtotal</span><span>{money(subtotal, currency)}</span></div>
          <div className="sum-row muted"><span>Delivery</span><span>At checkout</span></div>
          <div className="sum-row total"><span>Estimated total</span><span>{money(subtotal, currency)}</span></div>
          <Link href="/checkout" className="btn block" style={{ marginTop: '1.2rem' }}>Continue to checkout</Link>
          <div className="trust-row">
            <span><CashIcon /> Cash on Delivery</span>
            <span><PhoneIcon /> We call to confirm</span>
            <span><ShieldIcon /> No advance payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
