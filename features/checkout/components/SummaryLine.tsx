'use client';

import { Box, Typography } from '@mui/material';

export default function SummaryLine({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Box display='flex' justifyContent='space-between'>
      <Typography>{label}</Typography>
      <Typography>{`$${value}`}</Typography>
    </Box>
  );
}
