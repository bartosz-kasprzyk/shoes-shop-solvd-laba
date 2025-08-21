'use client';

import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import DropdownTrigger from './DropdownTrigger';
import DropdownMenu from './DropdownMenu';
import type { AdditionalPaymentOption } from './interface';

interface AdditionalPaymentDropdownProps {
  selectedMethod: string;
  additionalPaymentOptions: AdditionalPaymentOption[];
  onSelect: (optionValue: string) => void;
}

export default function AdditionalPaymentDropdown({
  selectedMethod,
  additionalPaymentOptions,
  onSelect,
}: AdditionalPaymentDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleSelect = (optionValue: string) => {
    setShowDropdown(false);
    onSelect(optionValue);
  };

  const handleToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Box
      ref={dropdownRef}
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: '12%' },
      }}
    >
      <DropdownTrigger
        selectedMethod={selectedMethod}
        additionalPaymentOptions={additionalPaymentOptions}
        isOpen={showDropdown}
        onToggle={handleToggle}
      />
      <DropdownMenu
        selectedMethod={selectedMethod}
        additionalPaymentOptions={additionalPaymentOptions}
        isOpen={showDropdown}
        onSelect={handleSelect}
      />
    </Box>
  );
}
