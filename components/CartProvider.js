'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { money } from '@/lib/format';
import { BagIcon, CloseIcon } from './Icons';

const CartContext = createContext(null);
const KEY = 'forerose_cart';

export function ShipMeter({ subtotal, freeOver, currency }) {
  if (!freeOver) return null;
  const left = freeOver - subtotal;
  const pct = Math.min(100, (subtotal / freeOver) * 100);
  return (
    <div className="ship-meter">
      {left > 0 ? (
        <span>Add <b>{money(left, currency)}</b> more for <b>free delivery</b></span>
      ) : (
        <span>✦ You get <b>free delivery</b></span>
      )}
      <div className="track"><div className="fill" style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export function CartProvider({ children, currency = 'Rs', freeDeliveryOver = 0 }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY)) || []);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const add = useCallback((product, qty = 1, { openDrawer = true } = {}) => {
    setItems((cur) => {
      const found = cur.find((i) => i.id === product.id);
      if (found) return cur.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...cur, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size: product.size, qty }];
    });
    if (openDrawer) setOpen(true);
  }, []);

  const setQty = (id, qty) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))));
  const remove = (id) => setItems((cur) => cur.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, loaded, add, setQty, remove, clear, count, subtotal, open, setOpen, currency, freeDeliveryOver }}>
      {children}
      <div className={`drawer-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer${open ? ' open' : ''}`} aria-hidden={!open} aria-label="Shopping bag">
        <div className="drawer-head">
          <h3>Your bag <small>{count} {count === 1 ? 'item' : 'items'}</small></h3>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close bag"><CloseIcon /></button>
        </div>
        {items.length === 0 ? (
          <div className="drawer-body drawer-empty">
            <BagIcon />
            <h3 style={{ fontSize: '1.8rem' }}>Your bag is empty</h3>
            <p className="muted">Find a scent you love and add it here.</p>
            <Link href="/#shop" className="btn" onClick={() => setOpen(false)}>Shop the collection</Link>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <ShipMeter subtotal={subtotal} freeOver={freeDeliveryOver} currency={currency} />
              {items.map((i) => (
                <div className="line" key={i.id}>
                  <img src={i.image} alt={i.name} />
                  <div>
                    <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)}><h4>{i.name}</h4></Link>
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
            <div className="drawer-foot">
              <div className="sum-row" style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                <span>Subtotal</span><span>{money(subtotal, currency)}</span>
              </div>
              <p className="muted" style={{ fontSize: '0.78rem', margin: '0 0 0.4rem' }}>Delivery is worked out at checkout. Pay in cash when it arrives.</p>
              <Link href="/checkout" className="btn block" onClick={() => setOpen(false)}>Checkout · Cash on Delivery</Link>
              <Link href="/cart" className="btn outline block" onClick={() => setOpen(false)}>View bag</Link>
            </div>
          </>
        )}
      </aside>
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
