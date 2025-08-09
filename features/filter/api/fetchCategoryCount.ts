import type { FetchProductsParams } from '../types/FetchProductsParams';
import { buildQueryForCategoryCount } from './buildQuaryForCategoryCount';

export const fetchCategoryCount = async (
  params: FetchProductsParams,
  categoryName: string,
  categoryType: string,
): Promise<number> => {
  const query = buildQueryForCategoryCount(params, categoryName, categoryType);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${query}`,
  );
  if (!res.ok) throw new Error('Failed to fetch genders');
  const json = await res.json();
  return json.meta.pagination.total;
};
