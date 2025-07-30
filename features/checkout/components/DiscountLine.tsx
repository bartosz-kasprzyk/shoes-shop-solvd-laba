'use client';

import { Box, Typography } from '@mui/material';
import DiscountIcon from '../../../shared/icons/DiscountIcon';
import type { promocode } from './CartSummary/interface';

export default function DiscountLine({ promocode }: { promocode: promocode }) {
  return (
    <Box display='flex' justifyContent='space-between' mt={1}>
      <Box display='flex' alignItems='center' gap={1}>
        <DiscountIcon sx={{ height: '0.7em' }} />
        <Typography fontSize='0.8em'>{promocode.code}</Typography>
      </Box>
      <Typography fontSize='0.8em'>- ${promocode.discoutInCash}</Typography>
    </Box>
  );
}
