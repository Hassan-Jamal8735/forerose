import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/db';
import ProductForm from '../ProductForm';

export default async function EditProduct({ params }) {
  const product = await getProduct((await params).id);
  if (!product) notFound();
  return (
    <>
      <div className="admin-top"><h1>Edit {product.name}</h1></div>
      <ProductForm product={product} />
    </>
  );
}
