import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { Button, TextUnderButton } from '@/shared/components/ui';

export default function GuestSideBar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 1,
      }}
    >
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          marginBottom: 1,
          color: '#1f2937',
          fontSize: { xs: 16, lg: 22 },
        }}
      >
        Guest
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: '#6b7280',
          marginBottom: 2,
          maxWidth: { xs: '60%', sm: '360px' },
          fontSize: { xs: 14, lg: 18 },
        }}
      >
        You need to sign in to access all site features
      </Typography>

      <Box
        sx={{ width: '65%' }}
        display={'flex'}
        flexDirection={'column'}
        gap={1}
      >
        <Link href='/sign-in' passHref>
          <Button sx={{ width: '100%' }} variant='primary'>
            Sign in
          </Button>
        </Link>

        <TextUnderButton
          text="Don't have an account?"
          linkText='Sign up'
          href='/sign-up'
        />
      </Box>
    </Box>
  );
}
