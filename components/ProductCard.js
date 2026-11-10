'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { money } from '@/lib/format';
import { scentOf } from '@/lib/scents';
import { isSet } from '@/lib/seed';

export default function ProductCard({ product, currency, delay = 0 }) {
  const { add } = useCart();
  const s = scentOf(product);
  const out = product.stock <= 0;
  const onSale = product.comparePrice > product.price;
  const off = onSale ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;
  const alt = product.gallery?.[0];
  const label = out ? 'Sold out' : 'Add to bag';

  return (
    <div className="reveal reveal-wrap" style={{ '--d': `${delay}s` }}>
    <div className="card" style={{ '--tint': s.tint, '--liquid': s.liquid }}>
      <div className="card-media">
      <Link href={`/product/${product.slug}`} className="card-img" aria-label={product.name}>
        <img src={product.image} alt={product.name} loading="lazy" />
        {alt && <img className="alt" src={alt} alt="" loading="lazy" />}
        <div className="card-badges">
          {out ? <span className="badge">Sold out</span> : onSale ? <span className="badge sale">−{off}%</span> : <span />}
          <span className="badge soft">{isSet(product) ? 'Gift box' : product.size}</span>
        </div>
      </Link>
      <div className="quick-add">
        <button className="btn small" disabled={out} onClick={() => add(product)}>{label}</button>
      </div>
      </div>
      <div className="card-body">
        <div className="top">
          <span className="fam">{isSet(product) ? product.category : `${s.family} · EDP`}</span>
          {!isSet(product) && <span className="dot" title="Scent colour" />}
        </div>
        <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <span className="tag">{product.tagline}</span>
        <div className="price">
          {money(product.price, currency)}
          {onSale && <s>{money(product.comparePrice, currency)}</s>}
        </div>
        <div className="card-mobile-add">
          <button className="btn small" disabled={out} onClick={() => add(product)}>{label}</button>
        </div>
      </div>
    </div>
    </div>
  );
}
