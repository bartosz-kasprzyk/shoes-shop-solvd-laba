'use client';

import { Box, Typography } from '@mui/material';
import type { PaymentMethod } from './interface';

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (methodId: string) => void;
}

export default function PaymentMethodCard({
  method,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  const IconComponent = method.icon;

  return (
    <Box
      onClick={() => onSelect(method.id)}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        gap: { xs: 2, sm: 1 },
        p: { xs: 0, sm: 2 },
        pt: { xs: 0, sm: 3 },
        pl: { xs: 1, sm: 2 },
        borderRadius: 2,
        minHeight: { xs: '48px', sm: '80px' },
        flexBasis: { xs: '100%', sm: '22%' },
        justifyContent: { xs: 'flex-start', sm: 'center' },
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'all 0.2s ease',
        outline: isSelected ? '2px solid #FE645E' : '2px solid #E1E1E1',
        outlineOffset: '2px',
        '&:hover': {
          outline: '2px solid #FE645E',
          outlineOffset: '2px',
          backgroundColor: '#FFF5F3',
        },
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <IconComponent />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '10px', sm: '14px', md: '18px' },
          fontWeight: 400,
          color: '#666',
        }}
      >
        {method.label}
      </Typography>
    </Box>
  );
}
