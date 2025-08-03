'use client';

import { TextField, Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { CartLogoIcon, CompanyLogoIcon, SearchIcon } from '@/shared/icons/';
import Link from 'next/link';
import { makeHeaderTitle } from '@/shared/icons/utils';

export default function TopBar() {
  const pathname = usePathname();

  return (
    <Box
      component='header'
      sx={{
        width: '100%',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        boxShadow: 'none',
        position: 'fixed',
        left: 0,
        top: 0,
        height: { xs: 60, lg: 120 },
        display: 'flex',
        alignItems: 'center',
        zIndex: '10',
      }}
    >
      <Box
        sx={{
          flexBasis: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, lg: 4 },
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
                    <Box sx={{ mr: 1 }}>
                      <SearchIcon />
                    </Box>
                  ),
                },
              }}
              sx={{
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
                gap: 2,
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
