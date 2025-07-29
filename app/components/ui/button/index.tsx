'use client';

import type { CustomButtonProps } from './interface';
import { StyledButton } from './variants';

export default function CustomButton({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className,
  disabled,
  sx,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      customVariant={variant}
      customSize={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      sx={{
        fontWeight: 500,
        transition: 'all 0.2s ease-in-out',
        ...(disabled && {
          cursor: 'not-allowed',
          opacity: 0.5,
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
