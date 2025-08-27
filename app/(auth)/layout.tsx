import { Box } from '@mui/material';

import { CompanyLogoIcon } from '@/shared/icons';
import Link from 'next/link';

export default function Layout({
  children,
  display,
}: Readonly<{
  children: React.ReactNode;
  display: React.ReactNode;
}>) {
  return (
    <>
      {/* Layout container */}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          bgcolor: 'white',
          display: 'flex',
        }}
      >
        {/* Left content */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component={Link}
            href={'/'}
            padding={2}
            borderBottom={{
              xs: '1px solid color-mix(in srgb, black 20%, transparent)',
              sm: 'none',
            }}
          >
            <CompanyLogoIcon />
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { xs: 'flex-start', md: 'space-around' },
              alignItems: 'center',
            }}
          >
            {children}
            <Box />
          </Box>
        </Box>

        {/* Right content */}
        <Box
          sx={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'flex-end',
          }}
        >
          {display}
        </Box>
      </Box>
    </>
  );
}
