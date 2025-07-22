import { SelectChangeEvent } from '@mui/material';

export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  id: string;
  title: string;
  error?: boolean;
  helperText?: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: Option[];
}
