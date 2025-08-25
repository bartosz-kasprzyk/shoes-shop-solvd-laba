import type { FiltersState } from '../types/FiltersState';
import type { FetchProductsParams } from '@/shared/interfaces/FetchProductsParams';

export function adaptFiltersToFetchParams(
  filters: FiltersState,
): FetchProductsParams {
  const { Gender, Brand, Color, Size, Price, search } = filters;

  const params: FetchProductsParams = {};

  if (Gender.length > 0) {
    params.gender = Gender;
  }

  if (Brand.length > 0) {
    params.brand = Brand.map((c) => c.replaceAll('_', ' '));
  }

  if (Color.length > 0) {
    params.color = Color;
  }

  if (Size.length > 0) {
    params.sizes = Size;
  }

  if (Price.set) {
    const [min, max] = Price.range;
    params.priceMin = min;
    params.priceMax = max;
  }

  if (search.length > 0) {
    params.search = search;
  }

  return params;
}
