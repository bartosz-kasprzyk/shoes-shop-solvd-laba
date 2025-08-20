import type { ApiItem } from '../../../shared/interfaces/ApiItem';
import type { FilterTypeUrlSegment } from '../types';
import { FilterType } from '../types';
import { buildQueryForCategory } from './buildQuaryForCategory';

export const fetchFilterValuesByFilterType = async (
  filterTypeUrlSegment: FilterTypeUrlSegment,
): Promise<ApiItem[]> => {
  const query = buildQueryForCategory('products');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${filterTypeUrlSegment}?${query}`,
  );
  if (!res.ok) throw new Error('Failed to fetch sizes');
  const json = await res.json();
  return json.data;
};
