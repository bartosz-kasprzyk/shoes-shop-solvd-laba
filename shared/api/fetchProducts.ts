import type { FetchProductsParamsInfiniteQuary } from '../interfaces/FetchProductsParams';
import type { ProductsResponse } from '../interfaces/ProductsResponse';
import { buildQuery } from './buildQuery';

export const fetchProducts = async ({
  pageParam = 1,
  filters = {},
}: FetchProductsParamsInfiniteQuary): Promise<ProductsResponse> => {
  const query = buildQuery(filters, String(pageParam));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${query.toString()}`,
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  const json = await res.json();
  const PageCount = parseInt(json.meta.pagination.pageCount ?? '0');
  const totalProducts = parseInt(json.meta.pagination.total ?? '0');
  return {
    data: json.data,
    currentPage: pageParam,
    nextPage: pageParam < PageCount ? pageParam + 1 : null,
    total: totalProducts,
  };
};
