'use client';

import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Dropdown, Input } from '@/shared/components/ui';
import type { ShippingInfo, ShippingInfoSectionProps } from './interface';
import countries from '../../consts/countries.json';

const countryList = Object.entries(countries).map(([value, label]) => ({
  value,
  label,
}));

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
    <Box px={2} py={1}>
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
        <Grid container columnSpacing={1.5}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Dropdown
              id='country'
              title='Country'
              value={shippingInfo.country}
              onChange={(e) => onChange('country', e.target.value)}
              error={!!shippingErrors.country}
              helperText={shippingErrors.country}
              options={countryList} // required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
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
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
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
          </Grid>
          <Grid size={12}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
