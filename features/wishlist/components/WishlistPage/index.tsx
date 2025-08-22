'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { removeFromWishlist } from '../../utils/wishlist';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { MyWishlistIcon } from '@/shared/icons';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProductsContainer from '@/features/products/components/ProductsContainer';
import type { Product } from '@/shared/interfaces/Product';
import type { ProductFromServer } from '@/features/products/types/components.interface';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const handleRemoveFromWishlist = (product: Product | ProductFromServer) => {
    removeFromWishlist(product.id);

    const saved = localStorage.getItem('wishlist');
    if (saved) {
      setWishlist(JSON.parse(saved));
    } else {
      setWishlist([]);
    }

    showSnackbar('Product removed from wishlist', 'warning', 5000);
  };

  if (wishlist.length === 0) {
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
          My Wishlist
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
      </Box>
    );
  }

  return (
    <ScrollableContainer>
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
          My Wishlist
        </Typography>
        <ProductsContainer
          products={wishlist}
          variant='removeFromWishlist'
          onProductAction={handleRemoveFromWishlist}
          isCard={true}
        />
      </Box>
    </ScrollableContainer>
  );
}
