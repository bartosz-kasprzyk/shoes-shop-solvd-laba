import { type ButtonProps } from '@mui/material';

export interface CustomButtonProps
  extends Omit<ButtonProps, 'onClick' | 'variant'> {
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
}
