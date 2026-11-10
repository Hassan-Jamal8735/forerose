import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ScentFinder from '@/components/ScentFinder';
import {
  BottleIcon, AwardIcon, LeafIcon, CashIcon, PhoneIcon, TruckIcon, ArrowIcon, GiftIcon, SparkleIcon,
} from '@/components/Icons';
import { listProducts, getSettings } from '@/lib/db';
import { SCENTS } from '@/lib/scents';
import { isSet } from '@/lib/seed';
import { money } from '@/lib/format';

// Hero bottle positions: [left %, width %, bottom %, z-index, float delay s]
const SPOTS = [
  [1, 19, 14, 2, 1.2],
  [15, 24, 10, 3, 0.4],
  [34, 32, 7, 5, 0],
  [61, 24, 10, 4, 0.8],
  [80, 19, 14, 2, 1.6],
];
const LINEUP_ORDER = ['soft-smoke', 'desire', 'icone', 'her', 'white-rose'];

export default async function Home() {
  const [products, settings] = await Promise.all([listProducts(), getSettings()]);
  const cur = settings.currency;
  const pack = products.find(isSet);
  const perfumes = products.filter((p) => !isSet(p));
  const lineup = LINEUP_ORDER.map((slug) => perfumes.find((p) => p.slug === slug)).filter(Boolean);
  const names = perfumes.map((p) => p.name);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="reveal">
            <span className="eyebrow">Eau de Parfum · 100 ml</span>
            <h1>Find Your</h1>
            <span className="script">Signature Scent</span>
            <p className="lead">
              {perfumes.length || 'Five'} long-lasting fragrances, each in a weighted glass bottle and gift tube. Not sure
              which one is you? Start with the Discovery Pack.
            </p>
            <div className="hero-actions">
              <Link href="#shop" className="btn">Shop the collection <ArrowIcon /></Link>
              {pack && <Link href={`/product/${pack.slug}`} className="btn outline">Try all {perfumes.length} first</Link>}
            </div>
            <div className="hero-stats">
              <div><b>{perfumes.length}</b><span>Signature scents</span></div>
              <div><b>100<small style={{ fontSize: '0.5em' }}>ml</small></b><span>Eau de parfum</span></div>
              <div><b>COD</b><span>Nationwide</span></div>
            </div>
          </div>
          <div className="lineup reveal" style={{ '--d': '0.15s' }}>
            <div className="halo" />
            <div className="ring" />
            <div className="ring r2" />
            <div className="floor" />
            {lineup.map((p, i) => {
              const [left, width, bottom, z, delay] = SPOTS[i];
              return (
                <Link key={p.id} href={`/product/${p.slug}`} title={p.name}
                  style={{ left: `${left}%`, width: `${width}%`, bottom: `${bottom}%`, zIndex: z }}>
                  <img src={`/products/${p.slug}-cut.png`} alt={p.name} style={{ animationDelay: `${delay}s` }} />
                </Link>
              );
            })}
            <div className="hero-tag" style={{ top: '8%', left: '2%' }}>
              <i><CashIcon /></i><div><b>Cash on Delivery</b><small>Pay at your door</small></div>
            </div>
            <div className="hero-tag" style={{ top: '22%', right: '0%', animationDelay: '1.5s' }}>
              <i><GiftIcon /></i><div><b>Gift-ready tube</b><small>With every bottle</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      {names.length > 0 && (
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...names, ...names, ...names, ...names].map((n, i) => (
              <span key={i}>{n} <em>✦</em></span>
            ))}
          </div>
        </div>
      )}

      {/* COLLECTION */}
      <section className="section" id="shop">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">The collection</span>
            <h2>Five scents. <span className="script" style={{ color: 'var(--cocoa)' }}>Endless moments</span></h2>
            <p>From fresh woods to soft smoke. Each one is an eau de parfum made to stay with you all day.</p>
          </div>
          <div className="grid five">
            {perfumes.map((p, i) => <ProductCard key={p.id} product={p} currency={cur} delay={i * 0.08} />)}
          </div>
          {products.length === 0 && <p className="center muted">New fragrances are coming soon.</p>}
        </div>
      </section>

      {/* DISCOVERY PACK */}
      {pack && (
        <section className="section showcase">
          <div className="container showcase-grid">
            <Link href={`/product/${pack.slug}`} className="showcase-img reveal">
              <img src={pack.image} alt={pack.name} />
            </Link>
            <div className="reveal" style={{ '--d': '0.1s' }}>
              <span className="eyebrow">Can&apos;t choose? Introducing the</span>
              <h2>{pack.name}</h2>
              <div className="big"><span className="gold-text">5 scents.</span><br />1 decision.</div>
              <p style={{ color: 'var(--stone)', maxWidth: 460 }}>{pack.description}</p>
              <div className="steps-mini">
                <div><b>01</b>Try all five on your skin</div>
                <div><b>02</b>Wear each one for a day</div>
                <div><b>03</b>Choose your full bottle</div>
              </div>
              <div className="price">
                {money(pack.price, cur)}
                {pack.comparePrice > pack.price && <s>{money(pack.comparePrice, cur)}</s>}
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link href={`/product/${pack.slug}`} className="btn light">Shop the pack <ArrowIcon /></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SCENT FINDER */}
      {perfumes.length > 0 && (
        <section className="section finder" id="finder">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow">Scent finder</span>
              <h2>What&apos;s your <span className="script" style={{ color: 'var(--cocoa)' }}>mood?</span></h2>
              <p>Pick a scent family to see the notes, strength and how long each one lasts.</p>
            </div>
            <div className="reveal"><ScentFinder products={perfumes} currency={cur} /></div>
          </div>
        </section>
      )}

      {/* WHY */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Why Forerose</span>
            <h2>Made to be remembered</h2>
          </div>
          <div className="features-grid">
            {[
              [BottleIcon, 'Long lasting', 'Eau de parfum strength, so one spray in the morning stays with you into the evening.'],
              [AwardIcon, 'Quality ingredients', 'Carefully blended oils for a smooth opening and a rich, clean dry-down.'],
              [LeafIcon, 'Every occasion', 'Fresh for the office, warm for evenings, soft for every day. There is one for each.'],
              [GiftIcon, 'Ready to gift', 'Every bottle comes in its own tube box. The Discovery Pack comes in a black gift box.'],
            ].map(([Icon, title, text], i) => (
              <div className="reveal reveal-wrap" style={{ '--d': `${i * 0.08}s` }} key={title}>
                <div className="feature-card">
                  <Icon />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section tight">
        <div className="container story">
          <div className="story-img reveal">
            <img src="/products/testers-banner.jpg" alt="The five Forerose scents" loading="lazy" />
            <div className="stamp"><div><b>forerose</b>A note you<br />can feel</div></div>
          </div>
          <div className="reveal" style={{ '--d': '0.1s' }}>
            <span className="eyebrow">Our story</span>
            <h2>Perfume should feel personal</h2>
            <blockquote>&ldquo;Your scent is the first thing people notice and the last thing they forget.&rdquo;</blockquote>
            <p className="muted">
              Forerose started with one idea: you should be able to try a fragrance on your own skin before you commit to
              a full bottle. So we made five distinct scents, put them all in one Discovery Pack, and made every order
              Cash on Delivery so it&apos;s easy to say yes.
            </p>
            <Link href="#finder" className="btn outline" style={{ marginTop: '1rem' }}>Find your scent <SparkleIcon /></Link>
          </div>
        </div>
      </section>

      {/* COD */}
      <section className="section cod" id="cod">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Cash on Delivery</span>
            <h2>Order now. Pay at your door.</h2>
            <p>No card needed. No advance payment.</p>
          </div>
          <div className="cod-steps">
            {[
              [BottleIcon, 'Place your order', 'Add your scents to the bag and enter your address. It takes a minute.'],
              [PhoneIcon, 'We call to confirm', 'Our team calls or WhatsApps you to confirm the order and delivery details.'],
              [TruckIcon, 'Pay in cash', `We deliver to your door and you pay the rider in cash.${settings.freeDeliveryOver ? ` Free delivery over ${money(settings.freeDeliveryOver, cur)}.` : ''}`],
            ].map(([Icon, title, text], i) => (
              <div className="cod-step reveal" style={{ '--d': `${i * 0.1}s` }} key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Questions</span>
            <h2>Good to know</h2>
          </div>
          <div className="faq reveal">
            <details open>
              <summary>How does Cash on Delivery work?</summary>
              <p>Place your order on the website. We call you to confirm, then deliver to your address. You pay the rider in cash when your parcel arrives.</p>
            </details>
            <details>
              <summary>How much is delivery?</summary>
              <p>
                Delivery is {money(settings.deliveryFee, cur)}
                {settings.freeDeliveryOver ? `, and it's free on orders over ${money(settings.freeDeliveryOver, cur)}` : ''}.
              </p>
            </details>
            <details>
              <summary>What is in the Discovery Pack?</summary>
              <p>A 5 ml tester of each Forerose scent ({names.join(', ')}) in a black gift box. It is the easiest way to find your favourite before buying a full bottle.</p>
            </details>
            <details>
              <summary>How long does the fragrance last?</summary>
              <p>Every Forerose scent is an eau de parfum. Spray it on your neck and wrists and don&apos;t rub. The warmer, deeper scents like Desire and Soft Smoke last the longest.</p>
            </details>
            <details>
              <summary>Can I send it as a gift?</summary>
              <p>Yes. Each bottle comes in its own tube box, and the Discovery Pack comes in a black gift box. Add the recipient&apos;s address at checkout and a note in the order notes.</p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section tight">
        <div className="container">
          <div className="cta-band reveal">
            <span className="eyebrow" style={{ color: 'var(--bronze-2)' }}>Smell unforgettable</span>
            <h2 style={{ marginTop: '1rem' }}>Your <span className="script">signature</span> is waiting</h2>
            <p>Order today and pay in cash when it arrives.</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="#shop" className="btn light">Shop now</Link>
              {pack && <Link href={`/product/${pack.slug}`} className="btn ghost-light">Discovery Pack</Link>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
