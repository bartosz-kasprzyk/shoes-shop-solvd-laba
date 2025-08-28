'use client';

import React, { useEffect, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import Button from '@/shared/components/ui/Button';
import ProductImages from './components/ProductImages';
import SizeSelector from './components/SizeSelector';
import type { ProductDetailsProps } from '@/features/products/types/components.interface';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { updateRecentlyViewed } from '@/features/recently-viewed/utils/recentlyViewedUtils';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/shared/hooks/useCart';
import { SignInModal } from '../SignInToContinueModal';
import { useWishlistStore } from '@/features/wishlist/stores/wishlistStore';
import useUser from '@/shared/hooks/useUser';

export default function ProductDetails({ initialData }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { addItem } = useCart();
  const { wishlistIds, toggleWishlist, setInitialWishlist } =
    useWishlistStore();
  const { showSnackbar } = useSnackbar();
  const { session } = useUser();
  const userId = session?.user?.id?.toString();
  const isAuthenticated = !!session?.user?.accessToken;
  const product = initialData.data.attributes;

  useEffect(() => {
    setInitialWishlist(userId);
  }, [userId, setInitialWishlist]);

  useEffect(() => {
    updateRecentlyViewed(initialData.data, initialData.data.id, userId);
  }, [initialData.data, userId]);

  const availableSizes = new Set(
    Array.isArray(product.sizes.data)
      ? product.sizes.data.map(({ attributes }) => attributes.value)
      : [],
  );

  const isInWishlist = wishlistIds.has(initialData.data.id);

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      (e.currentTarget as HTMLButtonElement).blur();
      return;
    }

    toggleWishlist(initialData.data.id, userId, showSnackbar);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
      (e.currentTarget as HTMLButtonElement).blur();
      return;
    }

    if (!selectedSize) {
      setShowSizeWarning(true);
    } else {
      addItem({
        productId: initialData.data.id.toString(),
        size: selectedSize.toString(),
        quantity: 1,
      });

      showSnackbar(
        `${product.name} (EU-${selectedSize}) added to the cart!`,
        'success',
        5000,
      );
    }
  };

  return (
    <ScrollableContainer>
      <Box
        display={'flex'}
        flexDirection={'column'}
        sx={{
          paddingX: { xs: 2, sm: 4 },
          width: '90%',
          margin: { xs: '25px auto', md: '50px auto' },
          gap: 2,
          justifyContent: 'center',
          maxWidth: '1454px',
        }}
      >
        <Link
          onClick={() => router.back()}
          style={{
            margin: 5,
            cursor: 'pointer',
            textDecoration: 'underline',
            textTransform: 'none',
            color: '#666',
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          Back
        </Link>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <ProductImages images={product.images.data} />

          <Box
            sx={{
              maxWidth: { xs: '100%', sm: '567px', md: '522px' },
              width: '100%',
              margin: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: '10px', lg: '105px' },
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Typography
                sx={{
                  lineHeight: 1,
                  fontSize: { xs: 22, sm: 30, md: 35, lg: 38, xl: 45 },
                  fontWeight: 500,
                }}
              >
                {product.name}
              </Typography>
              <Typography
                sx={{
                  lineHeight: 1,
                  fontSize: { xs: 19, xl: 22 },
                  fontWeight: 500,
                  display: 'block',
                }}
              >
                {`${new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}`}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: 15, lg: 18 },
                fontWeight: 500,
                color: '#A29F9F',
                marginBottom: { xs: '20px', xl: '47px' },
                marginLeft: '2px',
              }}
            >
              {product.color.data ? product.color.data.attributes.name : ''}
            </Typography>

            <SizeSelector
              availableSizes={availableSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              showSizeWarning={showSizeWarning}
              setShowSizeWarning={setShowSizeWarning}
            />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '26px',
                marginBottom: '65px',
                height: '61px',
              }}
            >
              <Button variant='outline' onClick={handleToggleWishlist}>
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
            </Box>

            <SignInModal
              isOpen={showSignInModal}
              onClose={() => setShowSignInModal(false)}
              callbackUrl={pathname}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                color: 'var(--color-text-primary)',
              }}
            >
              <Typography fontWeight={500}>Description</Typography>
              <Typography fontWeight={300}>{product.description}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
