'use client';

import { Box } from '@mui/material';
import { Input } from '@/shared/components/ui';
import VisaIcon from '@/shared/icons/VisaIcon';
import MastercardIcon from '@/shared/icons/MastercardIcon';
import AmexIcon from '@/shared/icons/AmexIcon';
import CVCIcon from '@/shared/icons/CVCIcon';
import type { CardPaymentData, CardPaymentFormProps } from './interface';

export default function CardPaymentForm({
  paymentData,
  onChange,
}: CardPaymentFormProps) {
  const handleChange =
    (field: keyof CardPaymentData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (field === 'cardNumber') {
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        value = value.substring(0, 19);
      }

      if (field === 'expirationDate') {
        value = value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        value = value.substring(0, 5);
      }

      if (field === 'securityCode') {
        value = value.replace(/\D/g, '').substring(0, 4);
      }

      onChange(field, value);
    };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Input
          id='cardNumber'
          title='Card number'
          placeholder='1234 1234 1234 1234'
          value={paymentData.cardNumber}
          onChange={handleChange('cardNumber')}
          required
          slotProps={{
            htmlInput: {
              maxLength: 19,
              inputMode: 'numeric',
            },
            input: {
              endAdornment: (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <MastercardIcon />
                  <AmexIcon />
                  <VisaIcon />
                </Box>
              ),
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ flexBasis: '33.33%' }}>
          <Input
            id='expirationDate'
            title='Expiration date'
            placeholder='MM/YY'
            value={paymentData.expirationDate}
            onChange={handleChange('expirationDate')}
            slotProps={{
              htmlInput: {
                maxLength: 5,
                inputMode: 'numeric',
              },
            }}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '33.33%' }}>
          <Input
            id='securityCode'
            title='Security code'
            placeholder='CVC'
            value={paymentData.securityCode}
            onChange={handleChange('securityCode')}
            slotProps={{
              htmlInput: {
                maxLength: 4,
                inputMode: 'numeric',
              },
              input: {
                endAdornment: <CVCIcon />,
              },
            }}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '33.33%' }}>
          <Input
            id='paymentCountry'
            title='Country'
            placeholder='USA'
            value={paymentData.country}
            onChange={handleChange('country')}
            required
          />
        </Box>
      </Box>
    </>
  );
}
