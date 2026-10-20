'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartContext = createContext(null);
const KEY = 'forerose_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      setItems(JSON.parse(localStorage.getItem(KEY)) || []);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = useCallback((product, qty = 1) => {
    setItems((cur) => {
      const found = cur.find((i) => i.id === product.id);
      if (found) return cur.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...cur, { id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image, size: product.size, qty }];
    });
    setToast(`${product.name} added to bag`);
    setTimeout(() => setToast(''), 2200);
  }, []);

  const setQty = (id, qty) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))));
  const remove = (id) => setItems((cur) => cur.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, loaded, add, setQty, remove, clear, count, subtotal }}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
