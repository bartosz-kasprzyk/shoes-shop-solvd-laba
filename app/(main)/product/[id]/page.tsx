import NotFound from '@/app/not-found';
import ProductDetails from '@/features/products/components/ProductDetails';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let productData = null;
  try {
    productData = await fetchProductById(id);
  } catch (e) {
    return <NotFound />;
  }

  return <ProductDetails initialData={productData} />;
}
