import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import EditModal from './EditModal';
import { Box } from '@mui/material';
import NotFound from '@/app/not-found';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  try {
    const productData = await fetchProductById(id);
    return <EditModal productData={productData.data} />;
  } catch (e) {
    return <NotFound />;
  }
}
