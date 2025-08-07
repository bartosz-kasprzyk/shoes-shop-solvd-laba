'use client';

import { TextField, Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { CartLogoIcon, CompanyLogoIcon, SearchIcon } from '@/shared/icons/';
import { makeHeaderTitle } from '@/shared/icons/utils';
import MenuIcon from '@/shared/icons/MenuIcon';
import Link from 'next/link';

export default function TopBar() {
  const pathname = usePathname();

  return (
    <Box
      component='header'
      sx={{
        position: 'fixed',
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
            <CompanyLogoIcon />
            <Box
              sx={{
                textTransform: 'capitalize',
                display: { xs: 'none', md: 'block' },
              }}
            >
              {makeHeaderTitle(pathname)}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <TextField
              fullWidth
              placeholder='Search'
              size='small'
              slotProps={{
                input: {
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <SearchIcon />
                    </Box>
                  ),
                },
              }}
              sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '9999px',
                  borderColor: '#494949',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#5C5C5C',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 0, md: 2 },
              }}
            >
              <Button
                sx={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  p: 1,
                  minWidth: 'auto',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <CartLogoIcon />
              </Button>
              <Button
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  p: 1,
                  minWidth: 'auto',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <SearchIcon />
              </Button>
              <Button
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  cursor: 'pointer',
                  borderRadius: '50%',
                  p: 1,
                  minWidth: 'auto',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <MenuIcon />
              </Button>
              <Button
                component={Link}
                href='/profile'
                sx={{
                  display: { xs: 'none', md: 'block' },
                  cursor: 'pointer',
                  borderRadius: '50%',
                  p: 1,
                  minWidth: 'auto',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                  },
                }}
              >
                <Box
                  sx={{
                    height: '24px',
                    width: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#9ca3af',
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
