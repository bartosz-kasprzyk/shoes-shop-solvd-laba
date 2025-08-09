import { fetchProducts } from '@/shared/api/fetchProducts';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ProductsPageClient from '../../../../features/products/components/ProductsPage';
import { parseFiltersFromSlug } from '@/features/filter/utils/parseFiltersFromSlug';
import { adaptFiltersToFetchParams } from '@/features/filter/utils/adaptFiltersToFetchParams';

export const revalidate = 60 * 60 * 24;

export async function generateStaticParams() {
  const popularCombinations = [{}];

  return popularCombinations.map((combo) => {
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
  const filters = adaptFiltersToFetchParams(
    await parseFiltersFromSlug(searchParams),
  );

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    pages: 2,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPageClient filters={filters} />
    </HydrationBoundary>
  );
}
