import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';

export default function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        width='20'
        height='13'
        viewBox='0 0 20 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.633301 1.26758H16.0001'
          stroke='#494949'
          strokeWidth='1.2'
          strokeLinecap='round'
        />
        <path
          d='M0.633301 7.41846H16.0001'
          stroke='#494949'
          strokeWidth='1.2'
          strokeLinecap='round'
        />
        <path
          d='M0.633301 13.5693H16.0001'
          stroke='#494949'
          strokeWidth='1.2'
          strokeLinecap='round'
        />
      </svg>
    </SvgIcon>
  );
}
