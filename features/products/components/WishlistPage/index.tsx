'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '@/features/products/components/ProductCard';
import { getWishlist, removeFromWishlist } from './wishlist';
import { adaptWishlistItemToCard } from '../ProductCard/ProductCard.adapter';
import type { WishlistItem } from '@/features/products/types/shared.interface';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { MyWishlistIcon } from '@/shared/icons';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
    showSnackbar('Product removed from wishlist!', 'warning', 5000);
  };

  if (wishlist.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          paddingTop: { xs: '100px', md: '200px' },
          margin: '0 40px',
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
          <MyWishlistIcon />
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
          You don&apos;t have any products in your wishlist yet
        </Typography>

        <Link href='/products' passHref>
          <Button variant='primary' sx={{ p: 1, px: 2 }}>
            Browse products
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <ScrollableContainer>
      <Box px={2}>
        <Grid container spacing={2}>
          {wishlist.map((product) => (
            <Grid key={product.id} size={{ xs: 6, md: 6, lg: 4, xl: 3 }}>
              <ProductCard
                card={adaptWishlistItemToCard(product)}
                variant='removeFromWishlist'
                onRemove={() => handleRemove(product.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ScrollableContainer>
  );
}
