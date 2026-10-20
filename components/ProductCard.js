'use client';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { money } from '@/lib/format';

export default function ProductCard({ product, currency }) {
  const { add } = useCart();
  const out = product.stock <= 0;
  const onSale = product.comparePrice > product.price;
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`} className="card-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        {out ? <span className="badge">Sold out</span> : onSale ? <span className="badge sale">Sale</span> : null}
      </Link>
      <div className="card-body">
        <span className="eyebrow">{product.size}</span>
        <Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link>
        <span className="tag">{product.tagline}</span>
        <div className="price">
          {money(product.price, currency)}
          {onSale && <s>{money(product.comparePrice, currency)}</s>}
        </div>
        <button className="btn small" disabled={out} onClick={() => add(product)}>
          {out ? 'Sold out' : 'Add to bag'}
        </button>
      </div>
    </div>
  );
}
