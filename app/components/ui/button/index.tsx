'use client';

import clsx from 'clsx';
import type { CustomButtonProps } from './interface';
import { StyledButton } from './variants';

export default function CustomButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      customVariant={variant}
      customSize={size}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'font-medium transition-all duration-200 ease-in-out',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
