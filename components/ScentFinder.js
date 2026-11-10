'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from './CartProvider';
import { Notes, ProfileBars, Mood } from './ScentProfile';
import { FAMILIES, scentOf } from '@/lib/scents';
import { money } from '@/lib/format';

export default function ScentFinder({ products, currency }) {
  const { add } = useCart();
  const families = FAMILIES.filter((f) => f.key === 'all' || products.some((p) => scentOf(p).family === f.key));
  const [family, setFamily] = useState('all');
  const list = family === 'all' ? products : products.filter((p) => scentOf(p).family === family);
  const [pickId, setPickId] = useState(products[0]?.id);
  const pick = list.find((p) => p.id === pickId) || list[0];
  if (!pick) return null;
  const s = scentOf(pick);
  const blurb = families.find((f) => f.key === family)?.blurb;

  return (
    <>
      <div className="finder-tabs" role="tablist">
        {families.map((f) => (
          <button key={f.key} role="tab" aria-selected={family === f.key} className={family === f.key ? 'active' : ''}
            onClick={() => { setFamily(f.key); setPickId(null); }}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="finder-stage">
        <Link href={`/product/${pick.slug}`} className="finder-visual" style={{ '--tint': s.tint }}>
          <img key={pick.id} src={pick.gallery?.[0] || pick.image} alt={pick.name} />
        </Link>
        <div className="finder-info" key={pick.id}>
          <p className="muted" style={{ marginTop: 0 }}>{blurb}</p>
          <div className="finder-picks">
            {list.map((p) => (
              <button key={p.id} className={p.id === pick.id ? 'active' : ''} style={{ '--liquid': scentOf(p).liquid }} onClick={() => setPickId(p.id)}>
                <i />{p.name}
              </button>
            ))}
          </div>
          <span className="eyebrow">{s.family} · Eau de Parfum · {pick.size}</span>
          <h3>{pick.name}</h3>
          <span className="script">{pick.tagline}</span>
          <Mood product={pick} />
          <Notes notes={pick.notes} />
          <ProfileBars product={pick} />
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1.5rem' }}>
            <button className="btn" disabled={pick.stock <= 0} onClick={() => add(pick)}>
              {pick.stock <= 0 ? 'Sold out' : `Add to bag · ${money(pick.price, currency)}`}
            </button>
            <Link href={`/product/${pick.slug}`} className="btn outline">Details</Link>
          </div>
        </div>
      </div>
    </>
  );
}
