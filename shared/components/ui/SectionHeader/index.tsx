'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlightedWord?: string;
  description?: string;
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: number;
}

export default function SectionHeader({
  title,
  subtitle,
  highlightedWord,
  description,
  textAlign = 'center',
  maxWidth = 600,
}: SectionHeaderProps) {
  const theme = useTheme();

  const formatTitle = () => {
    if (!highlightedWord) return title;

    const parts = title.split(highlightedWord);
    return (
      <>
        {parts[0]}
        <Box
          component='span'
          sx={{
            color: theme.palette.primary.main,
          }}
        >
          {highlightedWord}
        </Box>
        {parts[1]}
      </>
    );
  };

  return (
    <Box
      sx={{
        textAlign,
        mb: { xs: 6, md: 8 },
      }}
    >
      {subtitle && (
        <Typography
          variant='overline'
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.palette.primary.main,
            letterSpacing: 1,
            mb: 1,
            display: 'block',
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        variant='h2'
        sx={{
          fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
          fontWeight: 700,
          color: theme.palette.textPrimary.main,
          mb: description ? 2 : 0,
        }}
      >
        {formatTitle()}
      </Typography>
      {description && (
        <Typography
          variant='h6'
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
            color: theme.palette.primaryGrey.main,
            maxWidth,
            mx: textAlign === 'center' ? 'auto' : 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
