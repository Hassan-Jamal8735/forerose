import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductDetail from './ProductDetail';
import { getProductBySlug, listProducts, getSettings } from '@/lib/db';
import { isSet } from '@/lib/seed';

export async function generateMetadata({ params }) {
  const p = await getProductBySlug((await params).slug);
  return p ? { title: `${p.name} | Forerose`, description: p.tagline, openGraph: { images: [p.image] } } : {};
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, all, settings] = await Promise.all([getProductBySlug(slug), listProducts(), getSettings()]);
  if (!product) notFound();
  const pack = all.find(isSet);
  const perfumes = all.filter((p) => !isSet(p));
  const related = all.filter((p) => p.id !== product.id && !isSet(p)).slice(0, 4);

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span><Link href="/#shop">Shop</Link></span>
        <span>{product.name}</span>
      </nav>
      <ProductDetail product={product} settings={settings} pack={pack} perfumes={perfumes} />
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="section-head reveal">
            <span className="eyebrow">You may also love</span>
            <h2>More from Forerose</h2>
          </div>
          <div className="grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} currency={settings.currency} delay={i * 0.08} />)}
          </div>
        </section>
      )}
    </div>
  );
}
