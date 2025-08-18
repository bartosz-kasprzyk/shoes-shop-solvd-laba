'use client';

import { Box, Avatar, Typography } from '@mui/material';
import { EmptyState } from '@/shared/components/ui';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import useUser from '@/shared/hooks/useUser';
import CartIcon from './cart';

export default function MyProductsPage() {
  const { session } = useUser();

  const user = session?.user
    ? {
        name: session.user.name ?? 'Anonymous',
        avatar: session.user.image || undefined,
      }
    : null;
  return (
    <ScrollableContainer>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            height: { xs: '132px', lg: '262px' },
            backgroundImage: 'url(/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            marginBottom: '90px',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: '-58px', lg: '-90px' },
              left: '55px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Avatar
              src={user?.avatar || undefined}
              alt={user?.name || 'User'}
              sx={{
                width: { xs: 60, lg: 120 },
                height: { xs: 60, lg: 120 },
                backgroundColor: '#9ca3af',
                border: 'solid white',
                borderWidth: { xs: '2px', lg: '4px' },
              }}
            />
            <Box sx={{ color: 'black', size: 20 }}>
              <Typography
                component='h1'
                sx={{
                  fontWeight: 600,
                  marginBottom: 0.5,
                  paddingTop: 4,
                  fontSize: { xs: 16, lg: 22 },
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: '#5C5C5C', fontSize: { xs: 14, lg: 18 } }}
              >
                1 374 bonus points
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flex: 1, padding: '32px' }}>
          <Typography
            variant='h4'
            component='h2'
            sx={{
              fontWeight: 600,
              color: '#1f2937',
              fontSize: { xs: 35, lg: 42 },
            }}
          >
            My products
          </Typography>
          <EmptyState
            title="You don't have any products yet"
            description='Post can contain video, images and text'
            buttonText='Add product'
            buttonHref='/add-product'
            icon={<CartIcon />}
          />
        </Box>
      </Box>
    </ScrollableContainer>
  );
}
