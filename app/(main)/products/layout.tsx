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
      }}
    >
      <Box height={'100%'} borderRight={1}>
        Sidebars with filters TBA{' '}
      </Box>
      {children}
    </Box>
  );
}
