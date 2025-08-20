import { getQueryClient } from '@/shared/lib/getQueryClient';
import ProductsClientLayout from '@/features/filter/components/ProductsLayout';
import { fetchFilterValuesByFilterType } from '@/features/filter/api/fetchFilterValuesByFilterType';
import { filtersSections } from '@/features/filter/consts/filtersSections';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchPrices } from '@/features/filter/api/fetchPrices';
import { filterTypeToUrlSegmentMap } from '@/features/filter/mappings';

export default async function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  filtersSections.forEach((filterType) => {
    queryClient.prefetchQuery({
      queryKey: [filterType],
      queryFn: () =>
        fetchFilterValuesByFilterType(filterTypeToUrlSegmentMap[filterType]),
    });
  });

  // const allPrefetches: Promise<unknown>[] = filtersRaw.reduce((acc, filter) => {
  //   const promises = filter.filterItems.map((item) => {
  //     return queryClient.prefetchQuery({
  //       queryKey: ['category-count', item.attributes.name ?? item.attributes.value, {}],
  //       queryFn: () =>
  //         fetchFilterValueCount(
  //           {},
  //           item.attributes.name ?? item.attributes.value ?? '',
  //           filter.filterName,
  //         ),
  //     });
  //   });
  //   return acc.concat(promises);
  // }, [] as Promise<unknown>[]);

  // await Promise.allSettled(allPrefetches);

  await queryClient.prefetchQuery({
    queryKey: ['prices'],
    queryFn: () => fetchPrices(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsClientLayout>{children}</ProductsClientLayout>
    </HydrationBoundary>
  );
}
