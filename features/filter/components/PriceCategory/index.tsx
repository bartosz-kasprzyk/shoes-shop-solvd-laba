'use client';

import { Box, CircularProgress, Slider, Typography } from '@mui/material';
import { usePrices } from '../../hooks/usePrices';
import { useEffect, useState } from 'react';
import type { PriceCategoryProps } from './types';

export default function PriceCategory({
  priceSet,
  handleChange,
  filters,
  isControlled,
  setIsControlled,
}: PriceCategoryProps) {
  const { data: prices, isLoading, isError } = usePrices();
  const formatPrice = (value: number) => `$ ${value}`;

  if (prices)
    prices.sort((a, b) => {
      return a - b;
    });

  const min = prices ? prices[0] : 0;
  const max = prices?.slice(-1)[0] ?? 1000;

  const [innerPrice, setInnerPrice] = useState<number[]>([min, max]);
  useEffect(() => {
    if (!isControlled) {
      if (priceSet) {
        setInnerPrice([filters.priceMin, filters.priceMax]);
      } else {
        setInnerPrice([min, max]);
      }
      setIsControlled(true);
    }
  }, [priceSet]);

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      console.log('aaa', [newValue[0], newValue[1]]);
      setInnerPrice([newValue[0], newValue[1]]);
      const isSet = !(newValue[0] === min && newValue[1] === max);
      handleChange(newValue, isSet);
    }
  };

  if (isLoading) {
    return (
      <Box textAlign='center' mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign='center' mt={8}>
        <Typography color='error'>Something went wrong...</Typography>
      </Box>
    );
  }

  if (!prices || prices.length === 0) {
    return (
      <Box textAlign='center' mt={8}>
        <Typography>No prices found.</Typography>
      </Box>
    );
  }

  return (
    <Box p={2} display='flex' flexDirection='column'>
      <Slider
        value={innerPrice}
        onChange={handlePriceChange}
        getAriaLabel={() => 'Price range'}
        getAriaValueText={formatPrice}
        valueLabelDisplay='auto'
        min={min}
        max={max}
      />
    </Box>
  );
}
