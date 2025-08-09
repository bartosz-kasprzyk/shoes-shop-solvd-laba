import type { Product } from '@/shared/interfaces/Product';
import type { FetchProductsParams } from '../types/FetchProductsParams';
import qs from 'qs';

export const fetchPrices = async (): Promise<number[]> => {
  const filters: any = {};

  filters.teamName = { $eq: 'team-5' };
  const queryObject: any = {
    filters,
    pagination: {
      withCount: false,
      pageSize: 1000,
    },
    fields: ['price'],
  };

  const query = qs.stringify(queryObject, {
    encode: false,
    arrayFormat: 'brackets',
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/products?${query}`,
  );
  if (!res.ok) throw new Error('Failed to fetch prices');
  const json = await res.json();

  const prices = (json.data as Product[])
    .map((item: Product) => item.attributes?.price)
    .filter((price): price is number => typeof price === 'number');

  return prices;
};
