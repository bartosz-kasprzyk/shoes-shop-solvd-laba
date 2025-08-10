'use client';
import { Box } from '@mui/material';
import TopBar from '@/features/layout/components/TopBar';
import { getQueryClient } from '@/shared/lib/getQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TopBar />
        <Box height={'100%'} overflow={'hidden'}>
          {children}
        </Box>
      </QueryClientProvider>
    </Box>
  );
}
