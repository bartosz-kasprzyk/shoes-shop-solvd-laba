import type { SvgIconProps } from '@mui/material';
import { SvgIcon } from '@mui/material';

export default function DiscountIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        fill='var(--color-primary)'
        version='1.1'
        id='Capa_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 294.133 294.133'
        xmlSpace='preserve'
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path d='M283.224,10.909L178.977,0L0,178.977l115.156,115.156l178.977-178.977L283.224,10.909z M115.651,240.102l-61.62-61.62 l14.143-14.143l61.62,61.62L115.651,240.102z M232.661,96.827c-9.762,9.763-25.591,9.763-35.355,0 c-9.762-9.763-9.762-25.592,0-35.354c9.764-9.764,25.592-9.765,35.355,0C242.425,71.235,242.424,87.064,232.661,96.827z'></path>{' '}
        </g>
      </svg>
    </SvgIcon>
  );
}
