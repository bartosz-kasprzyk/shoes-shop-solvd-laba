import NotFound from '@/app/not-found';
import ProductDetails from '@/features/products/components/ProductDetails';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  const popularCombinations = [{ id: 1 }];

  return popularCombinations.map((combo) => {
    return { id: combo.id.toString() };
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const productData = await fetchProductById(id);

    return <ProductDetails initialData={productData} />;
  } catch {
    return notFound();
  }
}
