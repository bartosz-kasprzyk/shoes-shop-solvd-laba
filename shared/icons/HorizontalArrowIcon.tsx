import { Box } from '@mui/material';
export default function HorizontalArrowIcon({
  flip = false,
}: {
  flip?: boolean;
}) {
  return (
    <Box
      component='svg'
      width='50%'
      height='80%'
      viewBox='0 0 10 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      sx={{
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      <path d='M0.999999 1L9 9.5L1 18' stroke='#0D0D0D' />
    </Box>
  );
}
