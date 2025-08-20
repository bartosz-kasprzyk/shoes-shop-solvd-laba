export interface FetchProductsParams {
  sort?: string;
  page?: string;
  pageSize?: string;
  brand?: string[];
  color?: string;
  populate?: string;
  categories?: string;
  sizes?: string[];
  priceMin?: number;
  priceMax?: number;
  gender?: string[];
}
