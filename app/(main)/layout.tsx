'use client';

import CustomTopBar from '@/features/layout/components/TopBar';
import { Box } from '@mui/material';

export default function Layout({
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
        flexDirection: 'column',
      }}
    >
      <CustomTopBar />
      {children}
    </Box>
  );
}
