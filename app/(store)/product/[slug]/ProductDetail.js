'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { Notes, ProfileBars, Mood } from '@/components/ScentProfile';
import { CashIcon, TruckIcon, GiftIcon, ArrowIcon } from '@/components/Icons';
import { money } from '@/lib/format';
import { scentOf } from '@/lib/scents';
import { isSet } from '@/lib/seed';

export default function ProductDetail({ product, settings, pack, perfumes }) {
  const { add } = useCart();
  const router = useRouter();
  const cur = settings.currency;
  const s = scentOf(product);
  const set = isSet(product);
  const images = [product.image, ...(product.gallery || [])].filter(Boolean);
  const [active, setActive] = useState(images[0]);
  const [qty, setQty] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef(null);
  const out = product.stock <= 0;
  const max = Math.max(1, product.stock);
  const onSale = product.comparePrice > product.price;
  const save = onSale ? product.comparePrice - product.price : 0;

  useEffect(() => {
    const el = buyRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const buyNow = () => { add(product, qty, { openDrawer: false }); router.push('/checkout'); };

  return (
    <>
      <div className="pdp">
        <div className={`pdp-gallery${images.length > 1 ? '' : ' single'}`}>
          {images.length > 1 && (
            <div className="thumbs">
              {images.map((src) => (
                <button key={src} className={src === active ? 'active' : ''} onClick={() => setActive(src)} aria-label="Show image">
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
          <div className="pdp-main" style={{ '--tint': s.tint }}>
            <img key={active} src={active} alt={product.name} />
          </div>
        </div>

        <div className="pdp-info">
          <span className="eyebrow">{set ? product.category : `${s.family} · ${product.category}`} · {product.size}</span>
          <h1>{product.name}</h1>
          <p className="script">{product.tagline}</p>
          <div className="price">
            {money(product.price, cur)}
            {onSale && <s>{money(product.comparePrice, cur)}</s>}
            {save > 0 && <span className="save">Save {money(save, cur)}</span>}
          </div>
          {!set && <Mood product={product} />}
          <p className="lead">{product.description}</p>

          {set && perfumes.length > 0 && (
            <>
              <span className="eyebrow">What&apos;s inside</span>
              <div className="inside">
                {perfumes.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`}>
                    <img src={p.gallery?.[0] || p.image} alt={p.name} loading="lazy" style={{ background: scentOf(p).tint }} />
                    {p.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          {!set && <Notes notes={product.notes} />}
          {!set && <ProfileBars product={product} />}

          <div className="buy-row" ref={buyRef}>
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(Math.min(max, qty + 1))} aria-label="Increase">+</button>
            </div>
            <button className="btn" disabled={out} onClick={() => add(product, qty)}>
              {out ? 'Sold out' : 'Add to bag'}
            </button>
            {!out && <button className="btn outline" onClick={buyNow}>Buy now</button>}
          </div>
          {out ? null : product.stock < 10 ? (
            <div className="stock-note low">Only {product.stock} left, order soon</div>
          ) : (
            <div className="stock-note">In stock, ready to ship</div>
          )}

          <div className="perks">
            <div><CashIcon />Cash on Delivery</div>
            <div><TruckIcon />{settings.freeDeliveryOver ? `Free over ${money(settings.freeDeliveryOver, cur)}` : 'Fast delivery'}</div>
            <div><GiftIcon />Gift-ready box</div>
          </div>

          {!set && pack && (
            <Link href={`/product/${pack.slug}`} className="upsell">
              <img src={pack.image} alt="" />
              <div>
                <small>Not sure yet?</small>
                <b>Try all five first</b>
                <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Discovery Pack · {money(pack.price, cur)}</span>
              </div>
              <span className="arrow"><ArrowIcon width={20} /></span>
            </Link>
          )}

          <div className="accordion">
            <details>
              <summary>How to wear it</summary>
              <div className="acc-body">
                <p>Spray 2 to 3 times on your neck, wrists and behind the ears from about 15 cm away.</p>
                <p>Don&apos;t rub your wrists together. It breaks down the top notes faster.</p>
                <p>For longer wear, spray on moisturised skin or lightly on your clothes.</p>
              </div>
            </details>
            <details>
              <summary>Delivery &amp; payment</summary>
              <div className="acc-body">
                <p>Pay in cash when your order arrives. No card or advance payment needed.</p>
                <p>
                  Delivery is {money(settings.deliveryFee, cur)}
                  {settings.freeDeliveryOver ? `, free on orders over ${money(settings.freeDeliveryOver, cur)}` : ''}. We call you to
                  confirm before we send it.
                </p>
              </div>
            </details>
            <details>
              <summary>What you get</summary>
              <div className="acc-body">
                <p>{set ? `${product.size} in a black Forerose gift box.` : `One ${product.size} eau de parfum bottle in its own Forerose tube box.`}</p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {!out && (
        <div className={`sticky-buy${showBar ? ' show' : ''}`}>
          <div>
            <b>{product.name}</b>
            <small>{money(product.price, cur)}</small>
          </div>
          <button className="btn" onClick={() => add(product, qty)}>Add to bag</button>
        </div>
      )}
    </>
  );
}
