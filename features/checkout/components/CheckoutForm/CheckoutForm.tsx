'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CartSummary from '@/features/cart/components/CartSummary';
import ShippingInfoSection from '../ShippingInfoSection';
import PaymentInfoSection from '../PaymentInfoSection';
import SectionSeparator from '../SectionSeparator';
import type { PersonalInfo } from '../PersonalInfoSection/interface';
import type { ShippingInfo } from '../ShippingInfoSection/interface';
import type { PaymentInfo } from '../PaymentInfoSection/interface';
import type { CardPaymentData } from '../CardPaymentForm/interface';
import PersonalInfoSection from '../PersonalInfoSection';
import type { CheckoutFormProps } from './interface';

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    country: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'card',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: '',
  });

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev: PersonalInfo) => ({ ...prev, [field]: value }));
  };

  const handleShippingInfoChange = (
    field: keyof ShippingInfo,
    value: string,
  ) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentInfo((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handlePaymentDataChange = (
    field: keyof CardPaymentData,
    value: string,
  ) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ personalInfo, shippingInfo, paymentInfo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ flexBasis: '800px' }}>
          <Typography
            variant='h4'
            sx={{
              mb: 4,
              fontWeight: 500,
              fontSize: { xs: '24px', md: '32px' },
            }}
          >
            Checkout
          </Typography>

          <PersonalInfoSection
            personalInfo={personalInfo}
            onChange={handlePersonalInfoChange}
          />

          <SectionSeparator />

          <ShippingInfoSection
            shippingInfo={shippingInfo}
            onChange={handleShippingInfoChange}
          />

          <SectionSeparator />

          <PaymentInfoSection
            paymentInfo={paymentInfo}
            onPaymentMethodChange={handlePaymentMethodChange}
            onPaymentDataChange={handlePaymentDataChange}
          />
        </Box>

        <Box sx={{ flexBasis: '400px' }}>
          <Box sx={{ position: 'sticky' }}>
            <CartSummary />
          </Box>
        </Box>
      </Box>
    </form>
  );
}
