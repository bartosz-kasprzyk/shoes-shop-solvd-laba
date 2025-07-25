import { type ButtonProps } from '@mui/material';

export interface CustomButtonProps
  extends Omit<ButtonProps, 'onClick' | 'variant'> {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
}
