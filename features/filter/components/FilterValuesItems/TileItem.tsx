'use client';

import { Box, Checkbox, Grid, TextField, Typography } from '@mui/material';
import type { FilterItemProps } from './interface';

export default function TileItem({
  label,
  active,
  count,
  onToggle,
}: FilterItemProps) {
  const disabled = count === 0;
  const handleToggle = () => {
    if (!disabled || active) onToggle();
  };
  return (
    <Box
      display='flex'
      p={1}
      m={0.5}
      boxSizing={'border-box'}
      alignItems='center'
      gap={1}
      component='label'
      border={1}
      borderColor={
        active ? 'black' : 'color-mix(in srgb, black 30%, transparent)'
      }
      sx={{
        cursor: count === 0 ? 'not-allowed' : 'pointer',
      }}
      onClick={handleToggle}
    >
      <Typography
        color={
          disabled ? 'color-mix(in srgb, black 30%, transparent)' : 'black'
        }
        width={'100%'}
        textAlign={'center'}
      >
        {label}
      </Typography>
    </Box>
  );
}
