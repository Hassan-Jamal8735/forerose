import Link from 'next/link';
import { listProducts, getSettings } from '@/lib/db';
import ProductsTable from './ProductsTable';

export default async function ProductsPage() {
  const [products, s] = await Promise.all([listProducts({ includeInactive: true }), getSettings()]);
  return (
    <>
      <div className="admin-top">
        <h1>Products</h1>
        <Link href="/admin/products/new" className="btn small">+ Add product</Link>
      </div>
      <ProductsTable initial={products} currency={s.currency} />
    </>
  );
}
