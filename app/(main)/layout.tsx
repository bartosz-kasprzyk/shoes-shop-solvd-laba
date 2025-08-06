'use client';

import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import TopBar from '@/features/layout/components/TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TopBar />
      {children}
    </Box>
  );
}
