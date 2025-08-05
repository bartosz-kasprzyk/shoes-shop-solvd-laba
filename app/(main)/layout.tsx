'use client';

import TopBar from '@/features/layout/components/TopBar';
import { Box } from '@mui/material';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '120px 0 0 320px',
      }}
    >
      <TopBar />
      {children}
    </Box>
  );
}
