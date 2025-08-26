'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import CartList from './CartList';
import CartSummary from './CartSummary';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/ui';
import { useCartDetails } from './CartDetailsContext';

export default function CartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { refetchAllProducts } = useCartDetails();

  useEffect(() => {
    refetchAllProducts();
  }, []);

  return (
    <Box boxSizing={'border-box'} height={'100%'}>
      <CartList isMobile={isMobile} />
    </Box>
  );
}
