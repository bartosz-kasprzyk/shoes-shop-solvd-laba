import { Avatar, Box } from '@mui/material';
import type { Session } from 'next-auth';

export default function UserMessage({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-end',
      }}
    >
      <Avatar
        src={session?.user.image || undefined}
        alt={'User'}
        sx={{
          width: { xs: '24px', lg: '36px' },
          height: { xs: '24px', lg: '36px' },
          //   backgroundColor: 'white',
        }}
      >
        {session?.user.name ? session?.user.name.charAt(0).toUpperCase() : '?'}
      </Avatar>
      <Box
        border={1}
        sx={{
          width: 'fit-content',
          maxWidth: '80%',
          bgcolor: '#FE645E',
          color: 'white',
          wordBreak: 'break-word',
          borderRadius: '10px 10px 10px 0px',
          px: 2,
          py: 1,
          mb: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
