import type { TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps & {
  title: string;
  id: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  maxLength?: number;
};
