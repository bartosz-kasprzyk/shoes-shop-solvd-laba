'use client';

import { Box } from '@mui/material';
import CreditCardIcon from '@/shared/icons/CreditCardIcon';
import GooglePayIcon from '@/shared/icons/GooglePayIcon';
import CashAppIcon from '@/shared/icons/CashAppIcon';
import AfterPayIcon from '@/shared/icons/AfterPayIcon';
import PaymentMethodCard from './PaymentMethodCard';
import AdditionalPaymentDropdown from './AdditionalPaymentDropdown';
import type {
  PaymentMethod,
  AdditionalPaymentOption,
  PaymentMethodSelectorProps,
} from './interface';

const paymentMethods: PaymentMethod[] = [
  { id: 'card', label: 'Card', icon: CreditCardIcon },
  { id: 'google-pay', label: 'Google Pay', icon: GooglePayIcon },
  { id: 'cash-app-pay', label: 'Cash App Pay', icon: CashAppIcon },
  { id: 'after-payment', label: 'After Payment', icon: AfterPayIcon },
];

const additionalPaymentOptions: AdditionalPaymentOption[] = [
  { value: 'crypto', label: 'Crypto' },
  { value: 'barter', label: 'Barter' },
  { value: 'apple-pay', label: 'Apple Pay' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'wire-transfer', label: 'Wire Transfer' },
];

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  const handleMainMethodSelect = (methodId: string) => {
    onMethodChange(methodId);
  };

  const handleAdditionalMethodSelect = (optionValue: string) => {
    onMethodChange(optionValue);
  };

  return (
    <Box sx={{ mb: 3, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedMethod === method.id}
            onSelect={handleMainMethodSelect}
          />
        ))}
        <AdditionalPaymentDropdown
          selectedMethod={selectedMethod}
          additionalPaymentOptions={additionalPaymentOptions}
          onSelect={handleAdditionalMethodSelect}
        />
      </Box>
    </Box>
  );
}
