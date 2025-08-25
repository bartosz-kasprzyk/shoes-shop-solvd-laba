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
    <Box boxSizing={'border-box'} height={'100%'}>
      <CartList isMobile={isMobile} />
    </Box>
  );
}
