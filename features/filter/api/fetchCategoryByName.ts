import type { ApiItem } from '../../../shared/interfaces/ApiItem';
import type { FetchProductsParams } from '../types/FetchProductsParams';
import type { FilterCategory } from '../types/FilterCategory';
import { buildQueryForCategory } from './buildQuaryForCategory';

export const fetchCategoryByName = async (
  categoryName: FilterCategory,
  params: FetchProductsParams,
): Promise<ApiItem[]> => {
  const categoryUrlSegment = categoryName.toLocaleLowerCase() + 's';
  const query = buildQueryForCategory(params, 'products');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${categoryUrlSegment}?${query}`,
  );
  if (!res.ok) throw new Error('Failed to fetch sizes');
  const json = await res.json();
  return json.data;
};
