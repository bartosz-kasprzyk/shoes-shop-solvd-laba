import type { FilterCategory } from '../types/FilterCategory';
import type { FetchProductsParams } from '../types/FetchProductsParams';

export const filterKeyMap: Record<FilterCategory, keyof FetchProductsParams> = {
  Gender: 'gender',
  Brand: 'brand',
  Color: 'color',
  Size: 'sizes',
  Price: 'priceMin',
};
