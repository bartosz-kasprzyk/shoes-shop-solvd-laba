'use client';

import { Box, Divider } from '@mui/material';
import MenuList from '../MenuList';
import UserProfile from '../UserProfile';

export default function Sidebar() {
  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <UserProfile />
        <Divider />
        <MenuList />
      </Box>
    </Box>
  );
}
