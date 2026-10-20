'use client';
import { useState } from 'react';
import Link from 'next/link';
import { money } from '@/lib/format';

export default function ProductsTable({ initial, currency }) {
  const [products, setProducts] = useState(initial);

  async function remove(p) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' });
    if (res.ok) setProducts((cur) => cur.filter((x) => x.id !== p.id));
  }

  async function toggle(p) {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...p, active: !p.active }),
    });
    if (res.ok) {
      const updated = await res.json();
      setProducts((cur) => cur.map((x) => (x.id === p.id ? updated : x)));
    }
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Visible</th><th></th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td><img src={p.image} alt="" /></td>
              <td><b>{p.name}</b><div className="muted" style={{ fontSize: '0.8rem' }}>{p.size}</div></td>
              <td>{p.category}</td>
              <td>{money(p.price, currency)}</td>
              <td style={{ color: p.stock < 10 ? 'var(--danger)' : undefined, fontWeight: 600 }}>{p.stock}</td>
              <td>
                <button className={`pill ${p.active ? 'on' : 'off'}`} style={{ border: 'none', cursor: 'pointer' }} onClick={() => toggle(p)}>
                  {p.active ? 'Live' : 'Hidden'}
                </button>
              </td>
              <td className="actions">
                <Link href={`/admin/products/${p.id}`} className="btn small outline">Edit</Link>
                <button className="btn small danger" onClick={() => remove(p)}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan={7} className="center muted" style={{ padding: '2.5rem' }}>No products yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
