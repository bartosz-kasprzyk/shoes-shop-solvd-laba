'use client';

import { Box, Checkbox, Typography } from '@mui/material';
import type { FilterItemProps } from './interface';
import { useFilterSection } from '../FilterSection';

export default function CheckboxItem({
  label,
  active,
  count,
  onToggle,
}: FilterItemProps) {
  const { filterType, areFiltersUsed } = useFilterSection();
  const disabled = count === 0;
  return (
    <Box
      display='flex'
      alignItems='center'
      gap={1}
      component='label'
      sx={{ cursor: 'pointer' }}
      color={disabled ? '#9f9f9fff' : 'black'}
    >
      <Checkbox
        sx={{ px: 0 }}
        checked={active}
        onChange={onToggle}
        disabled={disabled && !active}
      />
      {filterType === 'color' && (
        <Box
          width={22}
          height={22}
          borderRadius='50%'
          bgcolor={label}
          border='1px solid #ccc'
        />
      )}
      <Typography>{label}</Typography>
      <Typography color={disabled ? '#9f9f9fff' : '#6E7278'}>
        {(!active || disabled) &&
          `(${(areFiltersUsed && !disabled ? '+' : '') + count})`}
      </Typography>
    </Box>
  );
}
