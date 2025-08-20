'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Button } from '@/shared/components/ui';
import Link from 'next/link';

export default function CallToAction() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: { xs: 6, md: 8 },
        p: { xs: 4, md: 6 },
        borderRadius: 3,
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontWeight: 600,
          mb: 2,
          fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' },
        }}
      >
        Ready to Find Your Perfect Pair?
      </Typography>
      <Typography
        variant='body1'
        sx={{
          mb: 4,
          opacity: 0.9,
          maxWidth: 500,
          mx: 'auto',
          fontSize: { xs: '0.9rem', md: '1rem' },
        }}
      >
        Browse our extensive collection and discover shoes that match your style
        and comfort needs.
      </Typography>
      <Button
        LinkComponent={Link}
        href='/products'
        size='large'
        variant='primary'
        sx={{ border: '1px solid white' }}
      >
        Browse Shoes
      </Button>
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />
    </Box>
  );
}
