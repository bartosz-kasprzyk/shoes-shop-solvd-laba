import { useQueries } from '@tanstack/react-query';
import type { FilterCategory } from '../types/FilterCategory';
import type { FetchProductsParams } from '../types/FetchProductsParams';
import { useRef } from 'react';
import { filterKeyMap } from '../utils/filterMapKey';
import { fetchCategoryCount } from '../api/fetchCategoryCount';

export function useCategoryCounts(
  categoryNames: string[],
  categoryType: FilterCategory,
  rawFilters: FetchProductsParams,
) {
  const keyToRemove = filterKeyMap[categoryType];
  const { [keyToRemove]: _omit, ...filters } = rawFilters;
  const categoryUrlSegment = categoryType.toLocaleLowerCase();
  const queries = useQueries({
    queries: categoryNames.map((name) => ({
      queryKey: ['category-count', name, filters],
      queryFn: () => fetchCategoryCount(filters, name, categoryUrlSegment),
      enabled: Boolean(name),
    })),
  });

  const lastCountsRef = useRef<Record<string, number>>({});

  const counts = categoryNames.reduce<Record<string, number>>(
    (acc, name, i) => {
      const query = queries[i];

      if (query.data !== undefined) {
        lastCountsRef.current[name] = query.data;
        acc[name] = query.data;
      } else if (query.isLoading && lastCountsRef.current[name] !== undefined) {
        acc[name] = lastCountsRef.current[name];
      } else {
        acc[name] = 0;
      }

      return acc;
    },
    {},
  );

  return counts;
}
