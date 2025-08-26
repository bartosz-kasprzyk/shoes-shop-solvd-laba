'use client';

import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import type { DropdownProps } from './interface';
import Label from '../Label';
import { DropdownArrowIcon } from '@/shared/icons';

export default function Dropdown({
  id,
  title,
  error,
  helperText,
  value,
  onChange,
  options,
}: DropdownProps) {
  return (
    <FormControl
      error={error}
      sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}
    >
      <Label id={id}>{title}</Label>
      <Box display={'flex'} position={'relative'}>
        <Box
          position={'absolute'}
          height={'100%'}
          width={'5%'}
          display={'flex'}
          alignItems={'center'}
          right='10px'
        >
          <DropdownArrowIcon />
        </Box>
        <Select
          fullWidth
          id={id}
          value={value}
          onChange={onChange}
          renderValue={(selected) => (
            <Typography
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              {options.find((o) => o.value === selected)?.label}
            </Typography>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                maxHeight: 400,
              },
            },
          }}
          sx={{
            height: { xs: '33px', sm: '40px', lg: '48px' },
            '& .MuiSelect-iconOutlined': {
              background: 'none',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: { sm: '12px auto', lg: '15px auto' },
              padding: '28px 40px 0 0',
              opacity: { xs: 0, sm: 1 },
              color: 'transparent',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-text-primary)',
              borderRadius: '8px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--color-primary)',
              borderWidth: '1px',
            },
            '& .MuiSelect-select': {
              fontSize: { xs: '10px', sm: '12px', lg: '15px' },
              paddingY: 0,
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'var(--color-primary)',
                  color: 'white',
                },
                '&.Mui-selected:hover, &.Mui-selected.Mui-focusVisible': {
                  bgcolor:
                    'color-mix(in srgb, var(--color-primary) 90%, black)',
                },
                '&:hover': {
                  bgcolor:
                    'color-mix(in srgb, var(--color-primary) 15%, transparent)',
                },
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
