'use client';

import Link from 'next/link';
import { Box } from '@mui/material';
import CheckoutForm from '@/features/checkout/components/CheckoutForm';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import type { CheckoutFormData } from '@/features/checkout/types';
import CheckoutContent from '@/features/checkout/components/CheckoutContent';

export default function CheckoutPage() {
  const handleSubmit = (formData: CheckoutFormData) => {
    console.log('Checkout form data:', formData);
  };

  return (
    <ScrollableContainer>
      <Box sx={{ maxWidth: '1360px', margin: '0 auto' }}>
        <CheckoutContent />
      </Box>
    </ScrollableContainer>
  );
}
