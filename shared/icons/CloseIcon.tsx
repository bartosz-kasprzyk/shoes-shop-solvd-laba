import { SvgIcon, type SvgIconProps } from '@mui/material';

export default function CloseIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M1 17L17 1M1 1L17 17'
          stroke='#2F2E2D'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </SvgIcon>
  );
}
