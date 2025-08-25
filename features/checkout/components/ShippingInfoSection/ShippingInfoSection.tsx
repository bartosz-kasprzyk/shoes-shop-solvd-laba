'use client';

import { Box, Typography } from '@mui/material';
import { Input } from '@/shared/components/ui';
import type { ShippingInfo, ShippingInfoSectionProps } from './interface';

export default function ShippingInfoSection({
  shippingInfo,
  shippingErrors,
  onChange,
}: ShippingInfoSectionProps) {
  const handleChange =
    (field: keyof ShippingInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <Box>
      <Typography variant='h6' sx={{ mb: 3, fontWeight: 500 }}>
        Shipping info
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Box sx={{ flexBasis: '25%' }}>
          <Input
            id='country'
            title='Country'
            placeholder='USA'
            value={shippingInfo.country}
            onChange={handleChange('country')}
            error={!!shippingErrors.country}
            helperText={shippingErrors.country}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '25%' }}>
          <Input
            id='city'
            title='City'
            placeholder='New York'
            value={shippingInfo.city}
            onChange={handleChange('city')}
            error={!!shippingErrors.city}
            helperText={shippingErrors.city}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '25%' }}>
          <Input
            id='state'
            title='State'
            placeholder='New York'
            value={shippingInfo.state}
            onChange={handleChange('state')}
            error={!!shippingErrors.state}
            helperText={shippingErrors.state}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '25%' }}>
          <Input
            id='zipCode'
            title='Zip Code'
            placeholder='10001'
            value={shippingInfo.zipCode}
            onChange={handleChange('zipCode')}
            error={!!shippingErrors.zipCode}
            helperText={shippingErrors.zipCode}
            required
          />
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Input
          id='address'
          title='Address'
          placeholder='street, apartment, studio'
          value={shippingInfo.address}
          onChange={handleChange('address')}
          error={!!shippingErrors.address}
          helperText={shippingErrors.address}
          required
        />
      </Box>
    </Box>
  );
}
