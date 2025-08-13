import type { ProductApiResponse } from '@/features/products/types/shared.interface';

export const fetchProductById = async (
  id: string,
): Promise<ProductApiResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products/${id}?populate=*`,
    { next: { revalidate: 5 * 60 } },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
};
