'use client';

import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';

export default function MinusIcon(props: SvgIconProps) {
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
          x1='12'
          y1='56'
          x2='100'
          y2='56'
          stroke='color-mix(in srgb, black 30%, transparent)'
          strokeWidth='15'
          strokeLinecap='round'
        />
      </svg>
    </SvgIcon>
  );
}
