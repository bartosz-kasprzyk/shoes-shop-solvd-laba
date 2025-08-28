'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { MyWishlistIcon } from '@/shared/icons';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProductsContainer from '@/features/products/components/ProductsContainer';
import type { ProductFromServer } from '@/features/products/types/shared.interface';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import { useWishlistStore } from '../../stores/wishlistStore';
import useUser from '@/shared/hooks/useUser';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<ProductFromServer[]>([]);
  const { wishlistIds, removeFromWishlist, setInitialWishlist } =
    useWishlistStore();
  const { showSnackbar } = useSnackbar();
  const { session } = useUser();
  const userId = session?.user?.id?.toString();

  useEffect(() => {
    setInitialWishlist(userId);
  }, [userId, setInitialWishlist]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const results: ProductFromServer[] = [];
      for (const id of Array.from(wishlistIds)) {
        try {
          const res = await fetchProductById(id.toString());
          results.push(res.data);
        } catch (err) {
          console.warn('Failed to fetch product', id, err);
        }
      }
      setWishlist(results);
    };

    if (wishlistIds.size > 0) fetchWishlistProducts();
  }, [wishlistIds]);

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId, userId, showSnackbar);

    setWishlist((prev) => prev.filter((p) => p.id !== productId));
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
        />
      </Box>
    </ScrollableContainer>
  );
}
