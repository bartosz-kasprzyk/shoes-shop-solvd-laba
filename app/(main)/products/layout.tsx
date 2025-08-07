'use client';

import { Box } from '@mui/material';

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      <Box height={'100%'}>Sidebars with filters TBA </Box>
      <Box width={'100%'}>{children}</Box>
    </Box>
  );
}
