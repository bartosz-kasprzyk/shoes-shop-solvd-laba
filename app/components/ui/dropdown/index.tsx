'use client';

import React from 'react';
import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { DropdownProps } from './interface';
import Label from '../common/Label';
import DropdownArrow from './icons/Arrow.svg';

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
      <Select
        id={id}
        value={value}
        onChange={onChange}
        sx={{
          height: { xs: '33px', sm: '40px', lg: '48px' },
          '& .MuiSelect-iconOutlined': {
            backgroundImage: `url(${DropdownArrow.src})`,
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
          '& .MuiSelect-select': {
            fontSize: { xs: '10px', sm: '12px', lg: '15px' },
            paddingY: 0,
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
