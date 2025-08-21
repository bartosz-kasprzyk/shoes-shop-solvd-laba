'use client';

import { Box, Typography } from '@mui/material';
import type { TotalSectionProps } from './TotalSection.interface';

export default function TotalSection({ total }: TotalSectionProps) {
  return (
    <Box
      paddingY={2}
      marginTop='30px'
      display='flex'
      justifyContent='space-between'
      fontWeight={600}
      sx={{
        borderTop: '1px color-mix(in srgb, black 10%, transparent) solid',
        borderBottom: '1px color-mix(in srgb, black 10%, transparent) solid',
      }}
    >
      <Typography>Total</Typography>
      <Typography>${total}</Typography>
    </Box>
  );
}
