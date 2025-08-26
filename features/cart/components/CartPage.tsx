'use client';

import { Box } from '@mui/material';
import CartList from './CartList';
import { useEffect } from 'react';
import { useCartDetails } from './CartDetailsContext';

export default function CartPage() {
  const { refetchAllProducts } = useCartDetails();

  useEffect(() => {
    refetchAllProducts();
  }, []);

  return (
    <Box boxSizing={'border-box'} height={'100%'}>
      <CartList />
    </Box>
  );
}
