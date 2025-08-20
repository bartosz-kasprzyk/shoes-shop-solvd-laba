import { useQuery } from '@tanstack/react-query';
import { fetchFilterValuesByFilterType } from '../api/fetchFilterValuesByFilterType';
import type { FilterType } from '../types';
import { filterTypeToUrlSegmentMap } from '../mappings';

export const useFilterValuesByFilterType = (filterType: FilterType) => {
  const categoryUrlSegment = filterTypeToUrlSegmentMap[filterType];
  return useQuery({
    queryKey: [filterType],
    queryFn: () => fetchFilterValuesByFilterType(categoryUrlSegment),
  });
};
