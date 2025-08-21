'use client';

import { Box, Typography } from '@mui/material';
import DropdownArrowIcon from '@/shared/icons/DropdownArrowIcon';
import type { AdditionalPaymentOption } from './interface';

interface DropdownTriggerProps {
  selectedMethod: string;
  additionalPaymentOptions: AdditionalPaymentOption[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function DropdownTrigger({
  selectedMethod,
  additionalPaymentOptions,
  isOpen,
  onToggle,
}: DropdownTriggerProps) {
  const isAdditionalPaymentMethod = (method: string) => {
    return additionalPaymentOptions.some((option) => option.value === method);
  };

  const getSelectedAdditionalPaymentLabel = () => {
    const selected = additionalPaymentOptions.find(
      (option) => option.value === selectedMethod,
    );
    return selected ? selected.label : 'Other';
  };

  return (
    <Box
      onClick={onToggle}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        gap: { xs: 2, sm: 1 },
        p: { xs: 0, sm: 2 },
        pt: { xs: 0, sm: 3 },
        pl: { xs: 1, sm: 2 },
        pr: { xs: 1, sm: 2 },
        borderRadius: 2,
        minHeight: { xs: '48px', sm: '80px' },
        justifyContent: { xs: 'flex-start', sm: 'center' },
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'all 0.2s ease',
        outline: isAdditionalPaymentMethod(selectedMethod)
          ? '2px solid #FE645E'
          : '2px solid #E1E1E1',
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
        <DropdownArrowIcon rotated={isOpen} />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: '10px', sm: '14px', md: '18px' },
          fontWeight: 400,
          color: '#666',
          textAlign: { xs: 'left', sm: 'center' },
          lineHeight: 1.2,
        }}
      >
        {isAdditionalPaymentMethod(selectedMethod)
          ? getSelectedAdditionalPaymentLabel()
          : 'Other'}
      </Typography>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          ml: 'auto',
        }}
      >
        <DropdownArrowIcon rotated={isOpen} />
      </Box>
    </Box>
  );
}
