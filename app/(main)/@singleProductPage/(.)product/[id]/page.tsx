import ProductDetails from '@/features/products/components/ProductDetails';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/?filters[teamName][$eq]=team-5&fields[0]=id&pagination[pageSize]=500&pagination[page]=1`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();

  return data.data.map((product: { id: number }) => ({
    id: product.id.toString(),
  }));
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
