import { useQueries } from '@tanstack/react-query';
import { useRef } from 'react';
import { fetchFilterValueCount } from '../api/fetchFilterValueCount';
import type { Filter, FilterType, FilterValue } from '../types';

export function useCountsByFilterValues(
  filterValues: FilterValue[],
  filterType: FilterType,
  initialRawFilters: Filter,
): {
  [key: string]: number;
} {
  const queries = useQueries({
    queries: filterValues.map((name) => {
      const filters = { ...initialRawFilters };
      filters[filterType] = [name];
      return {
        queryKey: ['filters-count', filters],
        queryFn: () => fetchFilterValueCount(filters, filterType),
      };
    }),
  });

  const lastCountsRef = useRef<Record<string, number>>({});

  const counts = filterValues.reduce<Record<string, number>>(
    (acc, filterValue, i) => {
      const query = queries[i];
      const name = filterValue.slug;
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
