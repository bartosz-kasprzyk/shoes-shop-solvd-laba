'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Button from '@/shared/components/ui/Button';
import type { SizeSelectorProps } from '@/features/products/types/components.interface';

export default function SizeSelector({
  availableSizes,
  selectedSize,
  setSelectedSize,
  showSizeWarning,
  setShowSizeWarning,
}: SizeSelectorProps) {
  const allSizes = Array.from({ length: 13 }, (_, i) => 36 + i);

  return (
    <>
      <Typography
        sx={{
          fontSize: { xs: 15, lg: 18 },
          fontWeight: 500,
          color: 'var(--color-text-primary)',
        }}
      >
        Select size
      </Typography>

      <Typography
        sx={{
          color: 'red',
          fontSize: 14,
          opacity: showSizeWarning ? 1 : 0,
        }}
        role='alert'
        aria-live='assertive'
      >
        Please choose your size.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(55px, 1fr))',
            sm: 'repeat(auto-fit, minmax(65px, 1fr))',
            lg: 'repeat(auto-fit, minmax(85px, 1fr))',
          },
          gap: { xs: '16px', md: '20px', lg: '24px' },
          margin: { xs: '10px 0 25px', xl: '5px 0 35px' },
          maxWidth: '100%',
        }}
      >
        {allSizes.map((size) => {
          const isAvailable = availableSizes.has(size);
          const isSelected = selectedSize === size;

          return (
            <Button
              key={size}
              variant='outline-black'
              onClick={() => {
                setSelectedSize(size);
                setShowSizeWarning(false);
              }}
              sx={{
                width: '100%',
                height: { xs: '45px', sm: '55px' },
                fontSize: { xs: '10px', sm: '15px' },
                fontWeight: '300 !important',
                bgcolor: isSelected
                  ? 'var(--color-text-primary) !important'
                  : 'inherit',
                color: isSelected
                  ? 'white !important'
                  : 'var(--color-text-secondary)',
                '&.Mui-disabled': {
                  bgcolor: '#F0F0F0',
                  color: 'var(--color-text-secondary)',
                  cursor: 'not-allowed',
                },
              }}
              disabled={!isAvailable}
            >
              EU-{size}
            </Button>
          );
        })}
      </Box>
    </>
  );
}
