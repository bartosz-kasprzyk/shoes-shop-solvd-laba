'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import FeatureCard from './FeatureCard';

const createFeatures = (theme: Theme) => [
  {
    icon: (
      <Box
        sx={{
          width: { xs: 50, md: 60 },
          height: { xs: 50, md: 60 },
          borderRadius: '50%',
          backgroundColor: `${theme.palette.primary.main}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M12 2L13.09 8.26L19 7L17.74 13.09L22 12L16.26 13.91L18 20L11.74 18.26L12 22L10.91 15.74L5 17L6.26 10.91L2 12L7.74 10.09L6 4L12.26 5.74L12 2Z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    ),
    title: 'Premium Quality',
    description:
      'Handpicked materials and expert craftsmanship ensure every pair meets our high standards.',
  },
  {
    icon: (
      <Box
        sx={{
          width: { xs: 50, md: 60 },
          height: { xs: 50, md: 60 },
          borderRadius: '50%',
          backgroundColor: `${theme.palette.primary.main}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    ),
    title: 'Perfect Fit Guarantee',
    description:
      'Our size guide and customer service ensure you get the perfect fit every time.',
  },
  {
    icon: (
      <Box
        sx={{
          width: { xs: 50, md: 60 },
          height: { xs: 50, md: 60 },
          borderRadius: '50%',
          backgroundColor: `${theme.palette.primary.main}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    ),
    title: 'Customer Satisfaction',
    description:
      'Join thousands of happy customers who trust us for their footwear needs.',
  },
  {
    icon: (
      <Box
        sx={{
          width: { xs: 50, md: 60 },
          height: { xs: 50, md: 60 },
          borderRadius: '50%',
          backgroundColor: `${theme.palette.primary.main}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
          <path
            d='M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm6 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z'
            fill={theme.palette.primary.main}
          />
        </svg>
      </Box>
    ),
    title: 'Fast & Secure Shipping',
    description:
      'Quick delivery with secure packaging to ensure your shoes arrive in perfect condition.',
  },
];

export default function FeaturesGrid() {
  const theme = useTheme();
  const features = createFeatures(theme);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        flexWrap: 'wrap',
        gap: { xs: 3, sm: 2, md: 3 },
        justifyContent: 'center',
      }}
    >
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            width: {
              xs: '100%',
              sm: 'calc(50% - 16px)',
              lg: 'calc(25% - 18px)',
            },
            mb: { xs: 0, sm: 5, md: 6, lg: 0 },
            display: 'flex',
          }}
        >
          <FeatureCard
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        </Box>
      ))}
    </Box>
  );
}
