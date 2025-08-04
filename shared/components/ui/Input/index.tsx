'use client';

import React from 'react';
import type { InputProps } from './interface';
import { Box, TextField } from '@mui/material';
import Label from '../Label';

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
            height: props.multiline
              ? 'auto'
              : { xs: '33px', sm: '40px', lg: '48px' },
            borderRadius: '8px',
            overflow: 'hidden',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error
                ? 'var(--color-primary)'
                : 'var(--color-text-primary)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-primary)',
              borderWidth: '1px',
            },
          },
          '& .MuiFormHelperText-root': {
            color: error ? 'var(--color-primary) !important' : 'inherit',
            marginLeft: '5px',
          },
          '& .MuiOutlinedInput-input': {
            fontWeight: 500,
            fontSize: { xs: '10px', sm: '12px', lg: '15px' },
            color: error ? 'var(--color-primary)' : 'inherit',
            '&::placeholder': {
              fontWeight: 300,
              color: '#5c5c5c',
              opacity: 1,
            },
          },
        }}
        {...props}
      />
    </Box>
  );
}
