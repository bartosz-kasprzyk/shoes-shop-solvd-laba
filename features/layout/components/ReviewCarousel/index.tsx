'use client';

import { Box, Typography, Rating, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import type { ReviewCarouselProps } from './interface';

import { HorizontalArrowIcon } from '@/shared/icons';

const GlassCard = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(12px)',
  backgroundImage: `
    radial-gradient(55.99% 112.1% at 69.71% 44.01%, rgba(253, 253, 253, 0.074) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(99.8deg, rgba(255, 255, 255, 0.42) -42.75%, rgba(255, 255, 255, 0.06) 84.76%)
  `,
  borderRadius: 33,
  border: '1px solid rgba(255, 255, 255, 0.64)',
  padding: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  maxWidth: 756,
  width: '80%',
}));

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: 'var(--color-primary)',
  },
  '& .MuiRating-icon': {
    marginRight: '3px',
  },
  fontSize: '1rem',
});

const GlassButton = styled(IconButton)(() => ({
  backdropFilter: 'blur(12px)',
  borderRadius: '100%',
  width: '2.375rem',
  height: '2.375rem',
  border: '1px solid rgba(255, 255, 255, 0.64)',
}));

export default function ReviewCarousel({
  className,
  testimonials,
}: ReviewCarouselProps) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index] || testimonials[0];
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return (
    <GlassCard className={className}>
      {/* Navigation Buttons */}
      <Box
        sx={{
          display: 'flex',
          float: 'right',
          ml: 2,
          gap: '32px',
        }}
      >
        <GlassButton size='small' onClick={handlePrev}>
          <HorizontalArrowIcon flip />
        </GlassButton>
        <GlassButton size='small' onClick={handleNext}>
          <HorizontalArrowIcon />
        </GlassButton>
      </Box>

      {/* Quote Text */}
      <Typography
        variant='h5'
        color='black'
        sx={{
          mr: '20%',
          display: '-webkit-box',
          WebkitLineClamp: 7,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        “{current.quote}”
      </Typography>

      {/* Author Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant='h5'
              color='black'
              sx={{
                fontWeight: 600,
              }}
            >
              {current.author}
            </Typography>
            {current.rating && <StyledRating value={current.rating} readOnly />}
          </Box>
          <Typography variant='body1' color='#797979'>
            {current.location}
          </Typography>
        </Box>
      </Box>
    </GlassCard>
  );
}
