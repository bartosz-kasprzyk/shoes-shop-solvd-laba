'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/shared/components/ui/Button';
import ProductImages from './components/ProductImages';
import SizeSelector from './components/SizeSelector';
import type { ProductDetailsProps } from '@/features/products/types/components.interface';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { updateRecentlyViewed } from '@/features/recently-viewed/utils/recentlyViewedUtils';

export default function ProductDetails({ initialData }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);

  const product = initialData.data.attributes;

  useEffect(() => {
    updateRecentlyViewed(initialData.data, initialData.data.id);
  }, [initialData.data]);

  const availableSizes = new Set(
    Array.isArray(product.sizes?.data)
      ? product.sizes?.data.map(({ attributes }) => attributes.value)
      : [],
  );

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeWarning(true);
    } else {
      alert('Product added to the bag!');
    }
  };

  return (
    <ScrollableContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          margin: { xs: '50px auto', md: '100px auto' },
          paddingX: { xs: 2, sm: 4 },
          justifyContent: 'center',
          width: '90%',
          maxWidth: '1454px',
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
              {`$${product.price}`}
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
            {product.color?.data ? product.color.data.attributes.name : ''}
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
            <Button
              variant='outline'
              onClick={() => alert('Added to wishlist!')}
            >
              Add to Wishlist
            </Button>
            <Button onClick={handleAddToCart}>Add to Bag</Button>
          </Box>

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
    </ScrollableContainer>
  );
}
