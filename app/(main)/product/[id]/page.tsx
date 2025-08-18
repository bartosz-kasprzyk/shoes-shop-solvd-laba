import NotFound from '@/app/not-found';
import ProductDetails from '@/features/products/components/ProductDetails';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    const productData = await fetchProductById(id);

    return <ProductDetails initialData={productData} />;
  } catch (e) {
    return <NotFound />;
  }
}
