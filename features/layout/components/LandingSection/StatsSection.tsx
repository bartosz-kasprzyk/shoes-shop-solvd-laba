'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const statsData = [
  { number: '10K+', label: 'Happy Customers' },
  { number: '500+', label: 'Shoe Models' },
  { number: '50+', label: 'Brands' },
];

export default function StatsSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: { xs: 3, md: 6 },
        mt: 6,
        justifyContent: { xs: 'center', md: 'flex-start' },
        flexWrap: 'wrap',
      }}
    >
      {statsData.map((stat) => (
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
  );
}
