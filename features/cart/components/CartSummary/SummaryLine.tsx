'use client';

import { Box, Typography } from '@mui/material';
import type { SummaryLineProps } from './SummaryLine.interface';

export default function SummaryLine({ label, value }: SummaryLineProps) {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography fontSize={{ xs: '0.8em' }}>{label}</Typography>
      <Typography fontSize={{ xs: '0.8em' }}>{`$${value}`}</Typography>
    </Box>
  );
}
