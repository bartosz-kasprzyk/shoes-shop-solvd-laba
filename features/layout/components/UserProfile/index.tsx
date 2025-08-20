'use client';

import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function UserProfile() {
  const { data: session } = useSession();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : undefined;

  return (
    <Box
      sx={{
        p: 3,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: 3,
      }}
    >
      <IconButton href='/settings'>
        <Avatar
          src={user?.avatar}
          alt={user?.name || 'User'}
          sx={{
            width: '48px',
            height: '48px',
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : '?'}
        </Avatar>
      </IconButton>
      <Box>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#98A2B3',
          }}
        >
          Welcome
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
          }}
        >
          {user?.name || 'Guest'}
        </Typography>
      </Box>
    </Box>
  );
}
