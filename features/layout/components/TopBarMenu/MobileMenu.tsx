'use client';

import { useState } from 'react';
import { Box, Fade, IconButton, Slide } from '@mui/material';
import { CloseIcon, MenuIcon } from '@/shared/icons';
import Sidebar from '../UserSideBar';
import type { UserProfile } from '../TopBar/interface';
import { ScrollableContainer } from '../ScrollableContainer';
import GuestSideBar from './GuestSideBar';

interface MobileMenuProps {
  user: UserProfile | null;
}

export default function MobileMenu({ user }: MobileMenuProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <IconButton
        sx={{
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
        }}
        onClick={() => setIsSideBarOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 13,
          pointerEvents: isSideBarOpen ? 'auto' : 'none',
        }}
      >
        <Slide direction='left' in={isSideBarOpen}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              position: 'absolute',
              maxWidth: '100%',
            }}
            zIndex={13}
            justifyContent={'flex-end'}
            bgcolor={'color-mix(in srgb, white 80%, black 10%)'}
            flexDirection={'row'}
            top={0}
            right={0}
            height={'100%'}
          >
            <Box
              height={'100%'}
              width={'100%'}
              bgcolor='white'
              zIndex={13}
              display={'flex'}
              flexDirection={'column'}
              maxWidth={'500px'}
              overflow={'hidden'}
            >
              <Box px={2.75} py={2.25} display={'flex'} justifyContent={'end'}>
                <IconButton onClick={() => setIsSideBarOpen(false)}>
                  <CloseIcon sx={{ fontSize: '10px' }} />
                </IconButton>
              </Box>
              <ScrollableContainer>
                {user ? (
                  <Box onClick={() => setIsSideBarOpen(false)}>
                    <Sidebar />
                  </Box>
                ) : (
                  <GuestSideBar />
                )}
              </ScrollableContainer>
            </Box>
          </Box>
        </Slide>

        <Fade in={isSideBarOpen} onClick={() => setIsSideBarOpen(false)}>
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              position: 'absolute',
              maxWidth: '100%',
            }}
            zIndex={12}
            justifyContent={'flex-end'}
            bgcolor={'color-mix(in srgb, white 80%, black 10%)'}
            flexDirection={'row'}
            top={0}
            right={0}
            width={'100%'}
            height={'100%'}
          />
        </Fade>
      </Box>
    </>
  );
}
