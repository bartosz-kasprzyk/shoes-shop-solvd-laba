'use client';

import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import EmptyStateForMuProducts from '@/features/products/components/EmptyStateForMuProducts';
import useUser from '@/shared/hooks/useUser';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMyProducts } from '@/app/api/products';
import {
  Typography,
  Box,
  Avatar,
  Slide,
  CircularProgress,
} from '@mui/material';
import ProductsContainer from '@/features/products/components/ProductsContainer';
import { Button } from '@/shared/components/ui';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function MyProductsPage() {
  const { session, isLoading } = useUser();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : null;

  const id = session?.user.id as number;
  const token = session?.user.accessToken as string;

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['myProducts', id],
      queryFn: ({ pageParam = 1 }) => fetchMyProducts(token, id, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      enabled: !!token && !!id,
    });

  const { ref, inView } = useInView({
    rootMargin: '1000px',
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading || status === 'pending') return <div>Loading...</div>;

  if (status === 'error') {
    return (
      <Typography variant='h6' color='error'>
        Something went wrong...
      </Typography>
    );
  }

  const totalProducts = data.pages[0]?.total ?? 0;

  return (
    <ScrollableContainer>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: '132px', lg: '262px' },
            backgroundImage: 'url(/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginBottom: '90px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '-58px', lg: '-90px' },
              left: '55px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Avatar
              src={user?.avatar || undefined}
              alt={user?.name || 'User'}
              sx={{
                width: { xs: 60, lg: 120 },
                height: { xs: 60, lg: 120 },
                backgroundColor: '#9ca3af',
                border: 'solid white',
                borderWidth: { xs: '2px', lg: '4px' },
              }}
            >
              <Typography fontSize={{ xs: '1.5em', lg: '3.5em' }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
              </Typography>
            </Avatar>
            <Box sx={{ color: 'black', size: 20 }}>
              <Typography
                component='h1'
                sx={{
                  fontWeight: 600,
                  marginBottom: 0.5,
                  paddingTop: 4,
                  fontSize: { xs: 16, lg: 22 },
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#5C5C5C', fontSize: { xs: 14, lg: 18 } }}
              >
                You have <b>{totalProducts}</b>{' '}
                {totalProducts === 1 ? 'Product' : 'Products'}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, padding: '32px' }}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            gap='20px'
            mb={6}
          >
            <Typography
              variant='h4'
              component='h2'
              sx={{
                fontWeight: 600,
                color: '#1f2937',
                fontSize: { xs: 35, lg: 42 },
              }}
            >
              My products
            </Typography>
            {totalProducts > 0 && (
              <Link href='/my-products/add-product' passHref>
                <Button variant='primary'>Add product</Button>
              </Link>
            )}
          </Box>

          {totalProducts > 0 ? (
            <>
              <ProductsContainer
                variant='dropdown'
                products={data.pages.flatMap((page) => page.data)}
              />
              <div ref={ref}></div>
              <Slide direction='up' in={isFetchingNextPage}>
                <Box display={'flex'} p={10} justifyContent={'center'}>
                  <CircularProgress />
                </Box>
              </Slide>
            </>
          ) : (
            <EmptyStateForMuProducts />
          )}
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
