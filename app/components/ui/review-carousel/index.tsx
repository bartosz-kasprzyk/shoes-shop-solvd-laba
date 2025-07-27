'use client';

import { Box, Typography, Rating, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useState } from 'react';
import type { ReviewCarouselProps } from './interface';

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

const ArrowIcon = ({ flip = false }: { flip?: boolean }) => (
  <Box
    component='svg'
    width='50%'
    height='80%'
    viewBox='0 0 10 19'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    sx={{
      transform: flip ? 'rotate(180deg)' : 'none',
    }}
  >
    <path d='M0.999999 1L9 9.5L1 18' stroke='#0D0D0D' />
  </Box>
);

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
    <GlassCard className={clsx(className)}>
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
          <ArrowIcon flip />
        </GlassButton>
        <GlassButton size='small' onClick={handleNext}>
          <ArrowIcon />
        </GlassButton>
      </Box>

      {/* Quote Text */}
      <Typography
        variant='h5'
        mr='20%'
        color='black'
        sx={{
          display: '-webkit-box',
          WebkitLineClamp: 7,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        “{current.quote}”
      </Typography>

      {/* Author Info */}
      <Box display='flex' alignItems='center' mt={3}>
        <Box>
          <Box display='flex' alignItems='center' gap={2}>
            <Typography variant='h5' fontWeight={600} color='black'>
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
