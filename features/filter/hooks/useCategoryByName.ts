import { useQuery } from '@tanstack/react-query';
import { fetchCategoryByName } from '../api/fetchCategoryByName';
import type { FetchProductsParams } from '../types/FetchProductsParams';
import type { FilterCategory } from '../types/FilterCategory';

export const useCategoryByName = (
  categoryName: FilterCategory,
  filters: FetchProductsParams,
) => {
  return useQuery({
    queryKey: [categoryName],
    queryFn: () => fetchCategoryByName(categoryName, filters),
  });
};
