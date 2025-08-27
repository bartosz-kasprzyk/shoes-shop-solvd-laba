'use client';

import { Box, Collapse, Divider, Typography } from '@mui/material';
import { DropdownArrowIcon } from '@/shared/icons';
import { useState } from 'react';
import type { FilterSectionDropdownProps } from './interface';
import capitalizeFirst from '@/shared/utils/capitalizeFirst';

export default function FilterSectionDropdown({
  children,
  filterType,
  filterCount,
  additionalText,
}: FilterSectionDropdownProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  return (
    <>
      <Box sx={{ p: 2.3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            cursor: 'pointer',
          }}
          onClick={() => setIsCategoryOpen((prev) => !prev)}
        >
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography fontWeight={500} variant='body1'>
              {capitalizeFirst(filterType)}
            </Typography>
            {filterCount !== 0 && filterCount && (
              <Box
                sx={{
                  bgcolor: 'var(--color-primary)',
                  color: 'white',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                }}
              >
                {filterCount}
              </Box>
            )}
            {additionalText && (
              <Typography sx={{ color: 'var(--color-primary)' }}>
                {additionalText}
              </Typography>
            )}
          </Box>
          <DropdownArrowIcon rotated={isCategoryOpen} />
        </Box>
        <Collapse in={isCategoryOpen}>{children}</Collapse>
      </Box>
      <Divider />
    </>
  );
}
