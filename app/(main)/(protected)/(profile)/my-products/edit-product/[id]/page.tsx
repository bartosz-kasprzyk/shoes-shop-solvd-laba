import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { notFound } from 'next/navigation';
import EditProductContent from '@/features/products/components/EditProductContent';
import { Suspense } from 'react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const productData = await fetchProductById(id);
    return (
      <Suspense>
        <EditProductContent productData={productData.data} />
      </Suspense>
    );
  } catch {
    return notFound();
  }
}
