'use client';

import { Box, Typography } from '@mui/material';
import type { AdditionalPaymentOption } from './interface';

interface AdditionalPaymentOptionProps {
  option: AdditionalPaymentOption;
  isSelected: boolean;
  onSelect: (optionValue: string) => void;
}

export default function AdditionalPaymentOptionComponent({
  option,
  isSelected,
  onSelect,
}: AdditionalPaymentOptionProps) {
  return (
    <Box
      onClick={() => onSelect(option.value)}
      sx={{
        p: { xs: 1.5, sm: 2 },
        cursor: 'pointer',
        backgroundColor: isSelected ? '#FFF5F3' : 'transparent',
        '&:hover': {
          backgroundColor: '#FFF5F3',
        },
        '&:not(:last-child)': {
          borderBottom: '1px solid #F0F0F0',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '10px', sm: '14px', md: '18px' },
          fontWeight: 400,
          color: '#333',
        }}
      >
        {option.label}
      </Typography>
    </Box>
  );
}
