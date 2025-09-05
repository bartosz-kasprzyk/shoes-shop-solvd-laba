'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@/shared/components/ui/Button';
import Link from 'next/link';

export default function HeroContent() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        textAlign: { xs: 'center', md: 'left' },
        order: { xs: 2, md: 1 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant='h1'
        sx={{
          fontSize: {
            xs: '2rem',
            sm: '2.5rem',
            md: '3.5rem',
            lg: '4rem',
          },
          fontWeight: 700,
          color: theme.palette.textPrimary.main,
          mb: 2,
          lineHeight: 1.2,
        }}
      >
        Step Into{' '}
        <Box
          component='span'
          sx={{
            color: theme.palette.primary.main,
            position: 'relative',
          }}
        >
          Style
        </Box>
      </Typography>
      <Typography
        variant='h5'
        sx={{
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
          fontWeight: 400,
          color: theme.palette.primaryGrey.main,
          mb: 4,
          lineHeight: 1.5,
          maxWidth: 500,
          mx: { xs: 'auto', md: 0 },
        }}
      >
        Discover our premium collection of shoes that combine comfort, quality,
        and cutting-edge design.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', md: 'flex-start' },
          alignItems: 'center',
        }}
      >
        <Button
          variant='primary'
          LinkComponent={Link}
          href='/products'
          sx={{
            px: { xs: 3, md: 4 },
            py: { xs: 1.2, md: 1.5 },
            fontSize: { xs: '0.9rem', md: '1.1rem' },
            fontWeight: 600,
            borderRadius: 2,
            minWidth: { xs: 180, sm: 140, md: 160 },
          }}
        >
          Shop Now
        </Button>
        <Button
          variant='outline'
          LinkComponent={Link}
          href='/products'
          sx={{
            px: { xs: 3, lg: 4 },
            py: { xs: 1.2, md: 1.5 },
            fontSize: { xs: '0.9rem', md: '1.1rem' },
            fontWeight: 600,
            borderRadius: 2,
            minWidth: { xs: 180, sm: 140, md: 160 },
          }}
        >
          Explore Collection
        </Button>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 3, md: 6 },
          mt: 6,
          justifyContent: { xs: 'center', md: 'flex-start' },
          flexWrap: 'wrap',
        }}
      >
        {[
          { number: '10K+', label: 'Happy Customers' },
          { number: '500+', label: 'Shoe Models' },
          { number: '50+', label: 'Brands' },
        ].map((stat) => (
          <Box key={stat.label} sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
              }}
            >
              {stat.number}
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: theme.palette.primaryGrey.main,
                fontWeight: 500,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
              }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
