'use client';
import CartPageEmpty from '@/features/cart/components/CartPageEmpty';
import CartSummary from '@/features/cart/components/CartSummary';
import { useCart } from '@/shared/hooks/useCart';
import { Box, Button, Link } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { totalItems } = useCart();
  const router = useRouter();
  return (
    <Box py={5} px={10} height={'100%'} overflow={'hidden'}>
      <Button
        variant='text'
        onClick={() => router.back()}
        style={{
          textDecoration: 'underline',
          textTransform: 'none',
          color: '#666',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        Back
      </Button>
      {totalItems > 0 ? (
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
