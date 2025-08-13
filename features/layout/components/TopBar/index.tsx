'use client';

import { Box, IconButton } from '@mui/material';
import { CompanyLogoIcon } from '@/shared/icons/';
import Link from 'next/link';
import useUser from '@/shared/hooks/useUser';
import SearchBar from './TopBarSearch';
import TopBarCart from './TopBarCart';
import TopBarMenu from '../TopBarMenu';

export default function TopBar() {
  const { session } = useUser();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : null;

  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        width: '100%',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        boxShadow: 'none',

        height: { xs: 60, md: 120 },

        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          flexBasis: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '64px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '44px',
              flexShrink: 0,
            }}
          >
            <IconButton href='/'>
              <CompanyLogoIcon />
            </IconButton>
            <Box
              component={Link}
              href='/products'
              sx={{
                display: { xs: 'none', md: 'block' },
                textDecoration: 'none',
                fontWeight: 500,
                color: '#000',
              }}
            >
              Products
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 0, md: 1 },
              }}
            >
              <SearchBar />
              <TopBarCart />
              <TopBarMenu user={user} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
