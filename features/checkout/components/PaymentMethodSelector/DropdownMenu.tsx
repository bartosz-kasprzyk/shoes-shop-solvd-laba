'use client';

import { Box } from '@mui/material';
import AdditionalPaymentOptionComponent from './AdditionalPaymentOption';
import type { AdditionalPaymentOption } from './interface';

interface DropdownMenuProps {
  selectedMethod: string;
  additionalPaymentOptions: AdditionalPaymentOption[];
  isOpen: boolean;
  onSelect: (optionValue: string) => void;
}

export default function DropdownMenu({
  selectedMethod,
  additionalPaymentOptions,
  isOpen,
  onSelect,
}: DropdownMenuProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        mt: 1,
        width: { xs: '100%', sm: '124px' },
        backgroundColor: 'white',
        border: '1px solid #E1E1E1',
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        overflow: 'hidden',
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transform: isOpen
          ? 'translateY(0) scaleY(1)'
          : 'translateY(-10px) scaleY(0.95)',
        transformOrigin: 'top',
        transition:
          'opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.15s cubic-bezier(0.4, 0, 0.2, 1), transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {additionalPaymentOptions.map((option) => (
        <AdditionalPaymentOptionComponent
          key={option.value}
          option={option}
          isSelected={selectedMethod === option.value}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}
