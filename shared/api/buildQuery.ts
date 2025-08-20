import qs from 'qs';
import type { Filter } from '@/features/filter/types';

export const buildQuery = (params: Filter, page: string): string => {
  const filters: any = {};
  if (params.brand?.length) {
    filters.brand = { id: { $in: params.brand.map((p) => p.id) } };
  }
  if (params.color?.length) {
    filters.color = { id: { $in: params.color.map((p) => p.id) } };
  }
  if (params.size?.length) {
    filters.sizes = { id: { $in: params.size.map((p) => p.id) } };
  }
  if (params.category?.length) {
    filters.categories = { id: { $in: params.category.map((p) => p.id) } };
  }
  if (params.gender?.length) {
    filters.gender = { id: { $in: params.gender.map((p) => p.id) } };
  }
  if (params.search?.length) {
    filters['$or'] = [
      { description: { $containsi: params.search[0].slug } },
      { name: { $containsi: params.search[0].slug } },
    ];
  }

  filters.teamName = { $eqi: 'team-5' };

  if (params.price?.length) {
    const [min, max] = params.price.map((p) => p.slug);
    filters['$and'] = [{ price: { $gte: min } }, { price: { $lte: max } }];
  }

  const pagination = {
    page: Number(page || '1'),
    pageSize: Number('12'),
  };

  const basePopulate = [
    'images',
    'description',
    'gender',
    'categories',
    'color',
  ];
  const queryObject: any = {
    filters,
    pagination,
    populate: basePopulate,
  };

  return qs.stringify(queryObject, {
    encodeValuesOnly: true,
    arrayFormat: 'indices',
  });
};
