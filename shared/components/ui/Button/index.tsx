'use client';

import type { CustomButtonProps } from './interface';
import { StyledButton } from './variants';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  disabled,
  sx,
  ...props
}: CustomButtonProps) {
  return (
    <StyledButton
      customVariant={variant}
      onClick={onClick}
      disabled={disabled}
      className={className}
      sx={{
        fontWeight: 500,
        transition: 'all 0.2s ease-in-out',
        ...(disabled && {
          cursor: 'not-allowed',
          opacity: 0.5,
          bgcolor: '#F0F0F0',
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
