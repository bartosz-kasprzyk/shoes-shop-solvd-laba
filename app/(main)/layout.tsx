'use client';

import { useSession } from 'next-auth/react';
import TopBar from '@/features/layout/components/TopBar';
import { Box } from '@mui/material';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image ?? undefined,
      }
    : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '120px 0 0 320px',
      }}
    >
      {/* <TopBar /> */}
      {children}
    </Box>
  );
}
