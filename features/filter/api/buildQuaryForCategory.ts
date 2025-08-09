import qs from 'qs';
import type { FetchProductsParams } from '../types/FetchProductsParams';

export const buildQueryForCategory = (
  params: FetchProductsParams,
  nestedFilterKey?: string,
): string => {
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

  if (params.sort) queryObject.sort = params.sort;
  if (pagination) queryObject.pagination = pagination;

  return qs.stringify(queryObject, {
    encode: false,
    arrayFormat: 'brackets',
  });
};
