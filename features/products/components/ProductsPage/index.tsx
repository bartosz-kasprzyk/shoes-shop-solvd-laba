'use client';
import { Box, CircularProgress, Grid, Slide, Typography } from '@mui/material';
import ProductCard from '@/features/products/components/ProductCard';
import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import LoadingProductsSkeleton from '../LoadingProductsSkeleton/LoadingProductsSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { fetchProducts } from '@/shared/api/fetchProducts';
import type { FetchProductsParams } from '@/shared/interfaces/FetchProductsParams';

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
      <Typography px={2} pb={4} variant='h4'>
        All Products ({data.pages[0]?.total || 0})
      </Typography>
      <Grid container spacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}>
        {data.pages.map((page) => {
          return page.data.map((product) => (
            <Grid key={product.id} size={{ xs: 6, md: 6, lg: 4, xl: 3 }}>
              <ProductCard card={adaptProductToCard(product)} />
            </Grid>
          ));
        })}
      </Grid>
      <div ref={ref}></div>
      <Slide direction='up' in={isFetchingNextPage}>
        <Box display={'flex'} p={10} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      </Slide>
    </Box>
  );
}
