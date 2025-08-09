import qs from 'qs';
import type { FetchProductsParams } from '../types/FetchProductsParams';

export const buildQueryForCategoryCount = (
  params: FetchProductsParams,
  categoryName: string,
  categoryType: string,
): string => {
  const filters: any = {};

  if (params.brand?.length) {
    filters.brand = { name: { $in: params.brand } };
  }

  if (params.color?.length) {
    filters.color = { name: { $in: params.color } };
  }

  if (params.sizes?.length) {
    filters.sizes = { value: { $in: params.sizes } };
  }
  if (params.gender?.length) {
    filters.gender = { name: { $in: params.gender } };
  }

  if (params.priceMin != null && params.priceMax != null) {
    filters.price = {
      $gte: params.priceMin,
      $lte: params.priceMax,
    };
  } else if (params.priceMin != null) {
    filters.price = {
      $gte: params.priceMin,
    };
  } else if (params.priceMax != null) {
    filters.price = {
      $lte: params.priceMax,
    };
  }
  filters[categoryType] = { name: { $in: categoryName } };
  filters.teamName = { $eq: 'team-5' };
  const pagination =
    params.pageSize === '0'
      ? undefined
      : {
          page: 1,
          pageSize: 1,
        };

  const basePopulate = ['images', 'gender'];
  if (params.populate) {
    basePopulate.push(params.populate);
  }

  const queryObject: any = {
    filters,
    populate: basePopulate,
  };

  if (params.sort) {
    queryObject.sort = params.sort;
  }

  if (pagination) {
    queryObject.pagination = pagination;
  }

  return qs.stringify(queryObject, {
    encode: false,
    arrayFormat: 'brackets',
  });
};
