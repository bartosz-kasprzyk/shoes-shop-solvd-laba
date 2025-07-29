'use client';

import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';

export default function PlusIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        width='112'
        height='112'
        viewBox='0 0 112 112'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line
          x1='56'
          y1='12'
          x2='56'
          y2='100'
          stroke='var(--color-primary)'
          strokeWidth='15'
          strokeLinecap='round'
        />
        <line
          x1='12'
          y1='56'
          x2='100'
          y2='56'
          stroke='var(--color-primary)'
          strokeWidth='15'
          strokeLinecap='round'
        />
      </svg>
    </SvgIcon>
  );
}
