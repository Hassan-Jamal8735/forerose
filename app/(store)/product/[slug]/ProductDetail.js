'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { money } from '@/lib/format';

export default function ProductDetail({ product, settings }) {
  const { add } = useCart();
  const router = useRouter();
  const images = [product.image, ...(product.gallery || [])].filter(Boolean);
  const [active, setActive] = useState(images[0]);
  const [qty, setQty] = useState(1);
  const out = product.stock <= 0;
  const max = Math.max(1, product.stock);
  const n = product.notes || {};

  return (
    <div className="pdp">
      <div>
        <div className="pdp-main"><img src={active} alt={product.name} /></div>
        {images.length > 1 && (
          <div className="thumbs">
            {images.map((src) => (
              <button key={src} className={src === active ? 'active' : ''} onClick={() => setActive(src)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <span className="eyebrow">{product.category} · {product.size}</span>
        <h1 style={{ marginTop: '0.8rem' }}>{product.name}</h1>
        <p className="script" style={{ fontSize: '2rem', color: 'var(--cocoa)', margin: 0 }}>{product.tagline}</p>
        <div className="price">
          {money(product.price, settings.currency)}
          {product.comparePrice > product.price && <s>{money(product.comparePrice, settings.currency)}</s>}
        </div>
        <p className="muted">{product.description}</p>

        {(n.top || n.heart || n.base) && (
          <div className="notes">
            {n.top && <div><b>Top</b><span>{n.top}</span></div>}
            {n.heart && <div><b>Heart</b><span>{n.heart}</span></div>}
            {n.base && <div><b>Base</b><span>{n.base}</span></div>}
          </div>
        )}

        <div className="buy-row">
          <div className="qty">
            <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty(Math.min(max, qty + 1))} aria-label="Increase">+</button>
          </div>
          <button className="btn" disabled={out} onClick={() => add(product, qty)}>
            {out ? 'Sold out' : 'Add to bag'}
          </button>
          {!out && (
            <button className="btn outline" onClick={() => { add(product, qty); router.push('/checkout'); }}>
              Buy now
            </button>
          )}
        </div>
        {!out && product.stock < 10 && <p className="error">Only {product.stock} left in stock</p>}

        <ul className="perks">
          <li>✓ Cash on Delivery: pay when your order arrives</li>
          <li>✓ Free delivery on orders over {money(settings.freeDeliveryOver, settings.currency)}</li>
          <li>✓ Long lasting, high quality fragrance</li>
        </ul>
      </div>
    </div>
  );
}
