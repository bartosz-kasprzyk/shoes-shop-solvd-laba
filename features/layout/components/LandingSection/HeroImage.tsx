'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

export default function HeroImage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        position: 'relative',
        order: { xs: 1, md: 2 },
        width: '100%',
        height: { xs: 300, md: 500 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 0, md: 500 },
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <Image
          src='/shoe-welcome.png'
          alt='Premium Shoes Collection'
          fill
          sizes={'30vw'}
          style={{
            objectFit: 'cover',
          }}
          priority
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          display: { xs: 'none', md: 'block' },
          bottom: { xs: -20, md: -30 },
          right: { xs: -20, md: -30 },
          backgroundColor: 'white',
          borderRadius: 2,
          p: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          border: `1px solid ${theme.palette.primary.main}20`,
          transform: 'rotate(-5deg)',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            color: theme.palette.textPrimary.main,
            mb: 1,
          }}
        >
          Free Shipping
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: theme.palette.primaryGrey.main,
          }}
        >
          On orders over $99
        </Typography>
      </Box>
    </Box>
  );
}
