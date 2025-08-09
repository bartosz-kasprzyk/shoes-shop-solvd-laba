import React from 'react';

export default function DropdownArrowIcon({
  rotated = false,
}: {
  rotated?: boolean;
}) {
  return (
    <svg
      width='15'
      height='9'
      viewBox='0 0 15 9'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{
        transform: rotated ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease',
      }}
    >
      <path
        d='M1 1L7.34437 7.34452L13.6889 1'
        stroke='#494949'
        strokeWidth='1.5'
      />
    </svg>
  );
}
