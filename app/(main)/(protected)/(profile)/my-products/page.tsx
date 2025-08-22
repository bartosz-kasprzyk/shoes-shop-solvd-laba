'use client';

import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import EmptyStateForMuProducts from '@/features/products/components/EmptyStateForMuProducts';
import useUser from '@/shared/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/app/api/products';
import { Typography, Box, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductsContainer from '@/features/products/components/ProductsContainer';
import { Button } from '@/shared/components/ui';
import Link from 'next/link';

export default function MyProductsPage() {
  const [userName, setUserName] = useState<string | null | undefined>('');
  const { session, isLoading } = useUser();

  useEffect(() => {
    if (session?.user) {
      setUserName(session.user.name);
    }
  }, [session?.user]);

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : null;

  const id = session?.user.id as number;
  const token = session?.user.accessToken as string;

  const { data, isLoading: isProductsLoading } = useQuery({
    queryKey: ['myProducts', id],
    queryFn: () => fetchProducts(token, id),
    enabled: !!token && !!id,
  });

  if (isLoading || isProductsLoading) return <div>Loading...</div>;
  const products = data?.data ?? [];

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
              sx={{
                width: { xs: 60, lg: 120 },
                height: { xs: 60, lg: 120 },
                backgroundColor: '#9ca3af',
                border: 'solid white',
                borderWidth: { xs: '2px', lg: '4px' },
              }}
            />
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
                {userName}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#5C5C5C', fontSize: { xs: 14, lg: 18 } }}
              >
                1 374 bonus points
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
            {products.length > 0 && (
              <Link href='/my-products/add-product' passHref>
                <Button variant='primary'>Add product</Button>
              </Link>
            )}
          </Box>

          {products.length > 0 ? (
            <ProductsContainer variant='dropdown' products={products} />
          ) : (
            <EmptyStateForMuProducts />
          )}
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
