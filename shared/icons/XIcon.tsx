import React from 'react';

type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export function XIcon({ size = 24, color = 'currentColor', className }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
      stroke={color}
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  );
}
