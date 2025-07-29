'use client';

import { Divider, Box } from '@mui/material';
import { UserProfile, MenuList } from './components';
import type { SidebarProps } from './interface';

export default function Sidebar({ user }: SidebarProps) {
  return (
    <Box
      sx={{
        height: '100%',
        position: 'fixed',
        top: 121,
        width: 320,
        backgroundColor: 'white',
        boxShadow:
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <UserProfile user={user} />
        <Divider />
        <MenuList />
      </Box>
    </Box>
  );
}
