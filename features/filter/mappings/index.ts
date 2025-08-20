import type {
  Filter,
  FilterType,
  FilterTypeUrlSegment,
  FilterValue,
} from '../types';
import type { FetchProductsParams } from '../types/FetchProductsParams';

export const filterTypeToUrlSegmentMap: Record<
  FilterType,
  FilterTypeUrlSegment
> = {
  gender: 'genders',
  brand: 'brands',
  color: 'colors',
  size: 'sizes',
  price: 'prices',
  category: 'categories',
  search: 'categories',
};

export const filterTypeToFetchName: Record<FilterType, string> = {
  gender: 'gender',
  brand: 'brand',
  color: 'color',
  size: 'sizes',
  price: 'price',
  category: 'categories',
  search: 'search',
};

export const filterTypeToValueType: Record<FilterType, string> = {
  gender: 'name',
  brand: 'name',
  color: 'name',
  size: 'value',
  price: 'name',
  category: 'name',
  search: 'name',
};

export const mapFiltersToParams = (filters: Filter): FetchProductsParams => {
  const strapiFilters: any = { $and: [] };

  (Object.entries(filters) as [FilterType, FilterValue[]][]).forEach(
    ([filterType, values]) => {
      if (!values || values.length === 0) return;

      if (filterType === 'price') {
        const [min, max] = values.map((v) => v.slug).sort();
        strapiFilters['$and'].push([
          { price: { $gte: min } },
          { price: { $lte: max } },
        ]);
        return;
      }
      if (filterType === 'search') {
        strapiFilters['$or'] = [
          { description: { $containsi: values[0].slug } },
          { name: { $containsi: values[0].slug } },
        ];
        return;
      }
      strapiFilters[filterTypeToFetchName[filterType]] = {
        id: values.map((v) => v.id),
      };
    },
  );
  return strapiFilters;
};
