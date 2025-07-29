'use client';

import UserSideBar from '@/shared/components/UserSideBar';
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
        flexDirection: 'row',
      }}
    >
      <UserSideBar />
      {children}
    </Box>
  );
}
