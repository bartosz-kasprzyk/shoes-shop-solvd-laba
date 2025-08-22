'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import CartList from './CartList';
import CartSummary from './CartSummary';
import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/components/ui';

export default function CartPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const summaryRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  const handleScrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const element = summaryRef.current;
    if (!isMobile || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowButton(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <Box
      boxSizing={'border-box'}
      height={'100%'}
      display={'flex'}
      justifyContent={'center'}
      flexDirection={{ xs: 'column', md: 'row' }}
      px={{ xs: 0, md: 8 }}
      sx={{
        gap: 'clamp(45px, 5vw, 160px)',
      }}
    >
      {isMobile ? (
        <>
          <ScrollableContainer>
            <CartList isMobile={isMobile} />
            <Box ref={summaryRef}>
              <CartSummary />
            </Box>
          </ScrollableContainer>

          <Button
            variant='primary'
            onClick={handleScrollToSummary}
            sx={{
              position: 'fixed',
              bottom: 20,
              left: '50%',
              zIndex: 14,
              borderRadius: '50px',
              px: 2.5,
              py: 1.2,
              transition: 'transform 1s ease-in-out',
              transform: showButton
                ? 'translateX(-50%) translateY(0)'
                : 'translateX(-50%) translateY(calc(100% + 20px))',

              visibility: showButton ? 'visible' : 'hidden',
              '&:hover': {
                transform: 'translateX(-50%) translateY(0) !important',
              },
            }}
          >
            Go to summary
          </Button>
        </>
      ) : (
        <>
          <Box flex={{ md: '0 0 51%' }} minWidth={0}>
            <CartList isMobile={isMobile} />
          </Box>
          <Box flex={{ md: '0 0 21%' }} minWidth={0}>
            <CartSummary />
          </Box>
        </>
      )}
    </Box>
  );
}
