'use client';

import { Box, Typography } from '@mui/material';
import DiscountIcon from '../../../../shared/icons/DiscountIcon';
import type { promocode } from './interface';

export default function DiscountLine({
  promocode,
  subtotal,
}: {
  promocode: promocode;
  subtotal: number;
}) {
  return (
    <Box
      display='flex'
      flexWrap={'nowrap'}
      justifyContent='space-between'
      mt={1}
    >
      <Box display='flex' alignItems='center' gap={1}>
        <DiscountIcon sx={{ height: '0.7em' }} />
        <Typography noWrap fontSize='0.8em'>
          {promocode.code} -
        </Typography>
      </Box>
      <Typography noWrap fontSize='0.8em'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(promocode.discoutInPercent * subtotal)}
      </Typography>
    </Box>
  );
}
