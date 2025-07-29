import { Avatar, Box, Typography } from '@mui/material';
import type { UserProfileProps } from './interface';

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Avatar
        src={user?.avatar}
        alt={user?.name || 'User'}
        sx={{ width: 48, height: 48 }}
      >
        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </Avatar>
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
          {user?.name || 'Jane Meldrum'}
        </Typography>
      </Box>
    </Box>
  );
}
