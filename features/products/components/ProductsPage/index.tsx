'use client';
import { Box, CircularProgress, Slide, Typography } from '@mui/material';
import LoadingProductsSkeleton from '../LoadingProductsSkeleton/LoadingProductsSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { fetchProducts } from '@/shared/api/fetchProducts';
import type { FetchProductsParams } from '@/shared/interfaces/FetchProductsParams';
import ProductsContainer from '../ProductsContainer';

type ProductsPageClient = {
  // filters: Record<string, string | string[]>; build error
  // filters: Record<string, any>; works
  filters: FetchProductsParams;
};

export default function ProductsPageClient({ filters }: ProductsPageClient) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const { ref, inView } = useInView({
    rootMargin: '1000px',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (status === 'pending')
    return (
      <>
        <LoadingProductsSkeleton />
      </>
    );

  if (error)
    return (
      <>
        <Typography variant='h6' color='error'>
          Something went wrong...
        </Typography>
      </>
    );
  return (
    <Box px={2}>
      <ProductsContainer pages={data.pages} withOverlay={true} />
      <div ref={ref}></div>
      <Slide direction='up' in={isFetchingNextPage}>
        <Box display={'flex'} p={10} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      </Slide>
    </Box>
  );
}
