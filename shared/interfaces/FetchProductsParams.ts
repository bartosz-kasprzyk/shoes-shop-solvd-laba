export interface FetchProductsParams {
  sort?: string;
  page?: string;
  pageSize?: string;
  brand?: string[];
  color?: string[];
  populate?: string;
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  gender?: string[];
  search?: string;
}
export interface FetchProductsParamsInfiniteQuary {
  pageParam?: number;
  filters?: FetchProductsParams;
}
