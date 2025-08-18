'use client';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '@/features/products/components/ProductCard';
import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import { useEffect, useState } from 'react';
import type { Product } from '@/shared/interfaces/Product';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { RecentlyViewedIcon } from '@/shared/icons';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';

export default function RecentlyViewedPage() {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    Product[]
  >([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      setRecentlyViewedProducts(JSON.parse(saved));
    }
  }, []);

  if (recentlyViewedProducts.length === 0) {
    return (
      <Box sx={{ flex: 1, padding: { xs: '20px 30px', md: '40px 60px' } }}>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontWeight: 600,
            marginBottom: 6,
            color: '#1f2937',
            fontSize: { xs: 35, lg: 42 },
          }}
        >
          Recently viewed
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingTop: { xs: '50px', md: '150px' },
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              backgroundColor: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 3,
            }}
          >
            <RecentlyViewedIcon />
          </Box>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 600,
              marginBottom: 3,
              color: '#1f2937',
              fontSize: { xs: 16, lg: 22 },
            }}
          >
            You haven&apos;t viewed any products yet
          </Typography>

          <Link href='/products' passHref>
            <Button variant='primary' sx={{ p: 1, px: 2 }}>
              Browse products
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <ScrollableContainer>
      <Box
        sx={{
          px: {
            xs: 'none',
            lg: '30px',
            xl: '60px',
          },
        }}
      >
        <Typography
          px={2}
          pt={4}
          pb={1}
          variant='h4'
          sx={{ fontSize: 'clamp(20px, 2.5vw, 45px)', fontWeight: 500 }}
        >
          Recently viewed
        </Typography>

        <Box
          sx={{
            py: {
              xs: '30px',
              lg: '45px',
              xl: '60px',
            },
          }}
        >
          <Box px={2}>
            <Grid container spacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}>
              {recentlyViewedProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 6, md: 6, lg: 4, xl: 3 }}>
                  <ProductCard card={adaptProductToCard(product)} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
