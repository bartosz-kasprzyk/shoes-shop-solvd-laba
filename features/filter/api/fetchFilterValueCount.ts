import type { Filter, FilterType } from '../types';
import { buildQueryFilterValueCount } from './buildQueryFilterValueCount';

export const fetchFilterValueCount = async (
  activeFilters: Filter,
  filterType: FilterType,
): Promise<number> => {
  const query = buildQueryFilterValueCount(activeFilters);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${query}`,
  );
  if (!res.ok) throw new Error(`Failed to fetch ${filterType}`);
  const json = await res.json();
  return json.meta.pagination.total;
};
