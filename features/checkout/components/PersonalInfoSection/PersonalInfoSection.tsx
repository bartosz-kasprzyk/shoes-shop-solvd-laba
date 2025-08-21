'use client';

import { Box, Typography } from '@mui/material';
import { Input } from '@/shared/components/ui';
import type { PersonalInfo, PersonalInfoSectionProps } from './interface';

export default function PersonalInfoSection({
  personalInfo,
  onChange,
}: PersonalInfoSectionProps) {
  const handleChange =
    (field: keyof PersonalInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 500 }}>
        Personal info
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '24px',
          mb: 4,
        }}
      >
        <Box sx={{ flexBasis: '50%' }}>
          <Input
            id='name'
            title='Name'
            placeholder='Jane'
            value={personalInfo.name}
            onChange={handleChange('name')}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '50%' }}>
          <Input
            id='surname'
            title='Surname'
            placeholder='Meldrum'
            value={personalInfo.surname}
            onChange={handleChange('surname')}
            required
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '24px',
          mb: 4,
        }}
      >
        <Box sx={{ flexBasis: '50%' }}>
          <Input
            id='email'
            title='Email'
            type='email'
            placeholder='rhc23@mail.co'
            value={personalInfo.email}
            onChange={handleChange('email')}
            required
          />
        </Box>
        <Box sx={{ flexBasis: '50%' }}>
          <Input
            id='phoneNumber'
            title='Phone number'
            placeholder='(949) 354-2574'
            value={personalInfo.phoneNumber}
            onChange={handleChange('phoneNumber')}
            required
          />
        </Box>
      </Box>
    </Box>
  );
}
