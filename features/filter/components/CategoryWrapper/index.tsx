'use client';

import { Box, Collapse, Typography } from '@mui/material';
import { DropdownArrowIcon } from '@/shared/icons';
import { useState } from 'react';
import type { CategoryProps } from './types';

export default function CategoryWrapper({
  children,
  filtersCount,
  additionalText,
  categoryName,
}: CategoryProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
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
          sx={{ height: '100%', display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <Typography fontWeight={500} variant='body1'>
            {categoryName}
          </Typography>
          {filtersCount !== 0 && filtersCount && (
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
              {filtersCount}
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
  );
}
