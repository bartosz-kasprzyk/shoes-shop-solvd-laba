'use client';
import { Box, CircularProgress, Slide, Typography } from '@mui/material';
import LoadingProductsSkeleton from '../LoadingProductsSkeleton/LoadingProductsSkeleton';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { fetchProducts } from '@/shared/api/fetchProducts';
import useFilterStore from '@/features/filter/stores/filterStore';
import type { Filter } from '@/features/filter/types';
import ProductsContainer from '../ProductsContainer';
import useProductsCountStore from '@/features/filter/stores/productCount';
import { useSession } from 'next-auth/react';
import EmptyState from '../EmptyState';
import { useWishlistStore } from '@/features/wishlist/stores/wishlistStore';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

export default function ProductsPageClient({ filters }: { filters: Filter }) {
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

  const { wishlistIds, toggleWishlist, setInitialWishlist } =
    useWishlistStore();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setInitialWishlist();
  }, [setInitialWishlist]);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user.accessToken;

  const { setAllFilterValues } = useFilterStore();
  const { setValue } = useProductsCountStore();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  useEffect(() => {
    setAllFilterValues(filters);
    setValue(data?.pages[0]?.total);
  }, []);

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
  if (!data.pages[0]?.total)
    return (
      <>
        <EmptyState
          text='There are no products match search'
          subText='Try to apply diffrent filters.'
        />
      </>
    );
  return (
    <Box px={2}>
      <ProductsContainer
        variant='toggleWishlist'
        onProductAction={
          isAuthenticated
            ? (id: number) => toggleWishlist(id, showSnackbar)
            : undefined
        }
        pages={data.pages}
        wishlistIds={wishlistIds}
      />
      <div ref={ref}></div>
      <Slide direction='up' in={isFetchingNextPage}>
        <Box display={'flex'} p={10} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      </Slide>
    </Box>
  );
}
