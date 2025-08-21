'use client';

import { Box, Typography } from '@mui/material';
import PaymentMethodSelector from '../PaymentMethodSelector';
import CardPaymentForm from '../CardPaymentForm';
import type { PaymentInfoSectionProps } from './interface';

export default function PaymentInfoSection({
  paymentInfo,
  onPaymentMethodChange,
  onPaymentDataChange,
}: PaymentInfoSectionProps) {
  return (
    <Box>
      <Typography
        variant='h6'
        sx={{ mb: 3, fontWeight: 500, fontSize: '18px' }}
      >
        Payment info
      </Typography>
      <PaymentMethodSelector
        selectedMethod={paymentInfo.paymentMethod}
        onMethodChange={onPaymentMethodChange}
      />
      {paymentInfo.paymentMethod === 'card' && (
        <CardPaymentForm
          paymentData={{
            cardNumber: paymentInfo.cardNumber,
            expirationDate: paymentInfo.expirationDate,
            securityCode: paymentInfo.securityCode,
            country: paymentInfo.country,
          }}
          onChange={onPaymentDataChange}
        />
      )}
    </Box>
  );
}
