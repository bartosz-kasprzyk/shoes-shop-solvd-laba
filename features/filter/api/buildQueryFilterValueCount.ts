import qs from 'qs';
import { mapFiltersToParams } from '../mappings';
import type { Filter } from '../types';

export const buildQueryFilterValueCount = (
  activeFilters: Filter,
  page: number = 1,
  pageSize: number = 100,
): string => {
  const params: any = mapFiltersToParams(activeFilters);

  params.teamName = { $eqi: 'team-5' };

  const basePopulate = ['images', 'gender', 'categories', 'color'];

  const queryObject: any = {
    filters: params,
    populate: basePopulate,
    pagination: {
      page,
      pageSize,
    },
  };

  return qs.stringify(queryObject, {
    encodeValuesOnly: true,
    arrayFormat: 'indices',
  });
};
