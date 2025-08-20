export const revalidate = 86400;

import { fetchProducts } from '@/shared/api/fetchProducts';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { fetchFilterValuesByFilterType } from '@/features/filter/api/fetchFilterValuesByFilterType';
import { filterTypeToUrlSegmentMap } from '@/features/filter/mappings';
import { filtersSections } from '@/features/filter/consts/filtersSections';
import type { Filter, FilterType } from '@/features/filter/types';
import { filtersSlugsFromSlug } from '@/features/filter/utils/filtersSlugsFromSlug';
import { apiItemToFilterValue } from '@/features/filter/utils/apiItemToFilterValue';
import mergeFilterValues from '@/features/filter/utils/mergeFilterValues';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductsPageClient from '@/features/products/components/ProductsPage';

export function generateStaticParams() {
  const popularCombinations = [{}];

  return popularCombinations.map(() => {
    const searchpath: string[] = [];
    return { searchpath };
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ searchpath: string[] }>;
}) {
  const { searchpath: searchParams } = await params;
  const urlFilters: Filter = filtersSlugsFromSlug(searchParams);

  const queryClient = getQueryClient();

  const apiFilters: Filter = (
    await Promise.all(
      filtersSections.map((filterType) =>
        queryClient.fetchQuery({
          queryKey: [filterType],
          queryFn: () =>
            fetchFilterValuesByFilterType(
              filterTypeToUrlSegmentMap[filterType],
            ),
        }),
      ),
    )
  ).reduce((acc, apiItems, i) => {
    const type = filtersSections[i];
    acc[type] = apiItems.map(apiItemToFilterValue);
    return acc;
  }, {} as Filter);

  Object.entries(urlFilters).forEach(([filterTypeString, FilterValues]) => {
    const filterType = filterTypeString as FilterType;
    if (apiFilters && apiFilters[filterType]) {
      const filtersfromUrl = mergeFilterValues(
        FilterValues,
        apiFilters[filterType],
      );
      urlFilters[filterType] = filtersfromUrl;
    }
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', urlFilters],
    queryFn: ({ pageParam }) =>
      fetchProducts({ pageParam, filters: urlFilters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    pages: 2,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPageClient filters={urlFilters} />
    </HydrationBoundary>
  );
}
