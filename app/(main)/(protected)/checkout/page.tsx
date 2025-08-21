'use client';

import Link from 'next/link';
import { Box } from '@mui/material';
import CheckoutForm from '@/features/checkout/components/CheckoutForm';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import type { CheckoutFormData } from '@/features/checkout/types';

export default function CheckoutPage() {
  const handleSubmit = (formData: CheckoutFormData) => {
    console.log('Checkout form data:', formData);
  };

  return (
    <ScrollableContainer>
      <Box
        sx={{ maxWidth: '1360px', margin: '0 auto', padding: { xs: 2, md: 4 } }}
      >
        <Box sx={{ mb: '24px' }}>
          <Link
            href='/checkout/cart'
            style={{
              textDecoration: 'underline',
              color: '#666',
              fontSize: '14px',
              fontWeight: 400,
            }}
          >
            Back to cart
          </Link>
        </Box>
        <CheckoutForm onSubmit={handleSubmit} />
      </Box>
    </ScrollableContainer>
  );
}
