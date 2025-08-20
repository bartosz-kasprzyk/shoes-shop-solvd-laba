'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        p: { xs: 3, sm: 2.5, md: 3 },
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        {icon}
      </Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          color: theme.palette.textPrimary.main,
          mb: { xs: 1.5, md: 2 },
          fontSize: { xs: '1.1rem', sm: '1rem', md: '1.125rem' },
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: theme.palette.primaryGrey.main,
          lineHeight: 1.6,
          fontSize: { xs: '0.9rem', sm: '0.875rem', md: '0.95rem' },
          maxWidth: '280px',
          margin: '0 auto',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
