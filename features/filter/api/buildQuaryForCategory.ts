import qs from 'qs';

export const buildQueryForCategory = (nestedFilterKey?: string): string => {
  const filters: Record<string, any> = {};

  const target = nestedFilterKey ? (filters[nestedFilterKey] = {}) : filters;

  target.teamName = { $eq: 'team-5' };

  const pagination = {
    withCount: false,
    pageSize: 1000,
  };

  const queryObject: Record<string, any> = {
    filters,
  };

  if (pagination) queryObject.pagination = pagination;

  return qs.stringify(queryObject, {
    encode: false,
    arrayFormat: 'brackets',
  });
};
