'use client';
import { useCartDetails } from '@/features/cart/components/CartDetailsContext';
import CartPageEmpty from '@/features/cart/components/CartPageEmpty';
import CartSummary from '@/features/cart/components/CartSummary';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { Box, Link } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cartItems } = useCartDetails();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Box py={5} px={10} height={'100%'} overflow={'hidden'}>
      <Link
        href='/cart'
        style={{
          textDecoration: 'underline',
          color: '#666',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        Back
      </Link>
      {cartItems.length ? (
        <Box
          display={'flex'}
          flexDirection={{ xs: 'column', md: 'row' }}
          height={'100%'}
          overflow={'hidden'}
          gap={5}
        >
          <Box flexGrow={1} height={'100%'} overflow={'hidden'}>
            {children}
          </Box>
          <Box flexShrink={1} width={'auto'}>
            <CartSummary />
          </Box>
        </Box>
      ) : (
        <CartPageEmpty />
      )}
    </Box>
  );
}
