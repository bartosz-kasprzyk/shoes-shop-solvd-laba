import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';

export default function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        d='M4 6h16'
        stroke='#494949'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M4 12h16'
        stroke='#494949'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M4 18h16'
        stroke='#494949'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </SvgIcon>
  );
}
