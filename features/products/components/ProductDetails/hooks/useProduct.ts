import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/productApi';
import type { ProductApiResponse } from '@/features/products/types/shared.interface';

export const useProduct = (
  id: string,
  initialData?: ProductApiResponse | null,
) =>
  useQuery<ProductApiResponse | null, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    initialData,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
  });
