'use client';

import React from 'react';
import { InputProps } from './interface';
import { Box, TextField } from '@mui/material';
import Label from '../common/Label';

export const InputsRow = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ mb: 3, display: 'flex', gap: 3 }}>{children}</Box>;
};

export default function Input({
  title,
  id,
  required,
  error,
  helperText,
  ...props
}: InputProps) {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <Label id={id} required={required}>
        {title}
      </Label>
      <TextField
        id={id}
        variant='outlined'
        error={error}
        helperText={error ? helperText : ''}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: { xs: '33px', sm: '40px', lg: '48px' },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--color-text-primary)',
            borderRadius: '8px',
          },
          '& .MuiOutlinedInput-input': {
            fontSize: { xs: '10px', sm: '12px', lg: '15px' },
          },
        }}
        {...props}
      />
    </Box>
  );
}
