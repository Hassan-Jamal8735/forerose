import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ProductDetail from './ProductDetail';
import { getProductBySlug, listProducts, getSettings } from '@/lib/db';

export async function generateMetadata({ params }) {
  const p = await getProductBySlug((await params).slug);
  return p ? { title: `${p.name} | Forerose`, description: p.tagline } : {};
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, all, settings] = await Promise.all([getProductBySlug(slug), listProducts(), getSettings()]);
  if (!product) notFound();
  const related = all.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container">
      <ProductDetail product={product} settings={settings} />
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <span className="eyebrow">You may also love</span>
            <h2>More from Forerose</h2>
          </div>
          <div className="grid">
            {related.map((p) => <ProductCard key={p.id} product={p} currency={settings.currency} />)}
          </div>
        </section>
      )}
    </div>
  );
}
