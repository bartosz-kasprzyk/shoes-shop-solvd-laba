'use client';

import { Box, Grid, Typography } from '@mui/material';
import { Input } from '@/shared/components/ui';
import type { PersonalInfo, PersonalInfoSectionProps } from './interface';

export default function PersonalInfoSection({
  personalInfo,
  personalErrors,
  onChange,
}: PersonalInfoSectionProps) {
  const handleChange =
    (field: keyof PersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <Box px={{ xs: 2, sm: 0 }} py={1}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 500 }}>
        Personal info
      </Typography>
      <Grid container columnSpacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id='name'
            title='Name'
            placeholder='Jane'
            value={personalInfo.name}
            onChange={handleChange('name')}
            error={!!personalErrors.name}
            helperText={personalErrors.name}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id='surname'
            title='Surname'
            placeholder='Meldrum'
            value={personalInfo.surname}
            onChange={handleChange('surname')}
            error={!!personalErrors.surname}
            helperText={personalErrors.surname}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id='email'
            title='Email'
            type='email'
            placeholder='rhc23@mail.co'
            value={personalInfo.email}
            onChange={handleChange('email')}
            error={!!personalErrors.email}
            helperText={personalErrors.email}
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input
            id='phoneNumber'
            title='Phone number'
            placeholder='949 354 574'
            value={personalInfo.phoneNumber}
            onChange={handleChange('phoneNumber')}
            error={!!personalErrors.phoneNumber}
            helperText={personalErrors.phoneNumber}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}
