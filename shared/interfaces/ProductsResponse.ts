import type { Product } from '@/shared/interfaces/Product';

export interface ProductsResponse {
  data: Product[];
  currentPage: number;
  nextPage: number | null;
  total: number;
}
