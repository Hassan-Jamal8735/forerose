'use client';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { money } from '@/lib/format';

export default function CartPage() {
  const { items, loaded, setQty, remove, subtotal } = useCart();
  if (!loaded) return null;

  if (items.length === 0)
    return (
      <div className="empty">
        <h1>Your bag is empty</h1>
        <p className="muted">Find your signature scent from our collection.</p>
        <Link href="/#shop" className="btn" style={{ marginTop: '1rem' }}>Shop fragrances</Link>
      </div>
    );

  return (
    <div className="container">
      <div className="page-title"><h1>Your Bag</h1></div>
      <div className="two-col">
        <div className="panel">
          {items.map((i) => (
            <div className="line" key={i.id}>
              <img src={i.image} alt={i.name} />
              <div>
                <Link href={`/product/${i.slug}`}><h4>{i.name}</h4></Link>
                <div className="muted" style={{ fontSize: '0.85rem' }}>{i.size} · {money(i.price)}</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
                  <div className="qty" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
                    <button onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)}>+</button>
                  </div>
                  <button className="link-btn" onClick={() => remove(i.id)}>Remove</button>
                </div>
              </div>
              <b>{money(i.price * i.qty)}</b>
            </div>
          ))}
        </div>
        <div className="panel">
          <h3 style={{ fontSize: '1.6rem' }}>Summary</h3>
          <div className="sum-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="sum-row muted"><span>Delivery</span><span>Calculated at checkout</span></div>
          <div className="sum-row total"><span>Total</span><span>{money(subtotal)}</span></div>
          <Link href="/checkout" className="btn block" style={{ marginTop: '1.2rem' }}>Checkout</Link>
          <p className="muted center" style={{ fontSize: '0.8rem', marginTop: '1rem' }}>Cash on Delivery available</p>
        </div>
      </div>
    </div>
  );
}
