'use client';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Product } from '@/shared/interfaces/Product';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { RecentlyViewedIcon } from '@/shared/icons';
import { EmptyState } from '@/shared/components/ui';
import ProductsContainer from '@/features/products/components/ProductsContainer';
import { useWishlistStore } from '@/features/wishlist/stores/wishlistStore';
import useUser from '@/shared/hooks/useUser';

export default function RecentlyViewedPage() {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<
    Product[]
  >([]);
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const { session } = useUser();
  const userId = session?.user?.id;

  useEffect(() => {
    const key = userId ? `recentlyViewed:${userId}` : 'recentlyViewed:guest';
    const saved = localStorage.getItem(key);
    if (saved) {
      setRecentlyViewedProducts(JSON.parse(saved));
    }
  }, [userId]);

  return (
    <ScrollableContainer>
      <Box sx={{ flex: 1, padding: { xs: '20px 30px', md: '40px 60px' } }}>
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontWeight: 500,
            marginBottom: 6,
            color: '#1f2937',
            fontSize: { xs: 35, lg: 42 },
          }}
        >
          Recently viewed
        </Typography>

        {recentlyViewedProducts.length === 0 && (
          <EmptyState
            title="You haven't viewed any products yet"
            buttonText='Browse products'
            buttonHref='/products'
            icon={<RecentlyViewedIcon />}
          />
        )}

        <ProductsContainer
          products={recentlyViewedProducts}
          variant='toggleWishlist'
          onProductAction={toggleWishlist}
          wishlistIds={wishlistIds}
        />
      </Box>
    </ScrollableContainer>
  );
}
