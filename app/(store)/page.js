import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { BottleIcon, AwardIcon, LeafIcon, CashIcon } from '@/components/Icons';
import { listProducts, getSettings } from '@/lib/db';

export default async function Home() {
  const [products, settings] = await Promise.all([listProducts(), getSettings()]);
  const sets = products.filter((p) => p.category === 'Sets');
  const others = products.filter((p) => p.category !== 'Sets');
  const pack = sets[0];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Premium perfume testers</span>
            <h1 style={{ marginTop: '1rem' }}>Find Your</h1>
            <span className="script">Signature Scent</span>
            <div className="divider">●</div>
            <p className="muted">
              Five distinct fragrances made to last. Try them on your skin, keep the one you love, and wear it with
              confidence.
            </p>
            <div className="hero-actions">
              <Link href="#shop" className="btn">Shop now</Link>
              {pack && <Link href={`/product/${pack.slug}`} className="btn outline">Discovery Pack</Link>}
            </div>
          </div>
          <div className="hero-img">
            <img src="/products/testers-banner.jpg" alt="Forerose perfume testers" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature"><BottleIcon />Long lasting fragrance</div>
          <div className="feature"><AwardIcon />High quality ingredients</div>
          <div className="feature"><LeafIcon />Perfect for every occasion</div>
          <div className="feature"><CashIcon />Cash on delivery</div>
        </div>
      </section>

      <section className="section" id="shop">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The collection</span>
            <h2>Five scents. <span className="script" style={{ color: 'var(--cocoa)' }}>Endless possibilities</span></h2>
          </div>
          <div className="grid">
            {[...sets, ...others].map((p) => (
              <ProductCard key={p.id} product={p} currency={settings.currency} />
            ))}
          </div>
          {products.length === 0 && <p className="center muted">New fragrances are coming soon.</p>}
        </div>
      </section>

      {pack && (
        <section className="section showcase">
          <div className="container showcase-grid">
            <img src={pack.image} alt={pack.name} />
            <div>
              <span className="eyebrow">Introducing the</span>
              <h2 style={{ marginTop: '1rem' }}>{pack.name}</h2>
              <p style={{ fontSize: '1.1rem', opacity: 0.85 }}>Add more presence to your day with a fragrance that never dates.</p>
              <div className="big"><span>5 scents.</span><br />1 decision.</div>
              <p style={{ opacity: 0.75 }}>Travel friendly · Good as a gift · Find your signature</p>
              <Link href={`/product/${pack.slug}`} className="btn" style={{ marginTop: '1.5rem' }}>Shop the pack</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section center">
        <div className="container">
          <span className="eyebrow">Smell unforgettable. Stay confident.</span>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginTop: '1rem' }}>Crafted for those who love to stand out</h2>
          <div className="divider center">♡</div>
          <p className="muted" style={{ maxWidth: 560, margin: '0 auto 2rem' }}>
            Order online and pay in cash when your parcel arrives. No card needed.
          </p>
          <Link href="#shop" className="btn cocoa">Order now</Link>
        </div>
      </section>
    </>
  );
}
