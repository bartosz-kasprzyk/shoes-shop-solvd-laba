'use client';

import { Box, LinearProgress, Slider, Typography } from '@mui/material';
import { usePrices } from '../../hooks/usePrices';
import FilterSectionDropdown from '../FilterSectionDropdown';
import useFilterStore from '../../stores/filterStore';
import { useEffect, useState } from 'react';

export default function PriceFilterSection() {
  const { filters, setFilterValues } = useFilterStore();
  const { data: prices, isLoading, isError } = usePrices();
  const formatPrice = (value: number) => `$ ${value}`;

  if (prices)
    prices.sort((a, b) => {
      return a - b;
    });

  const [min, max] = prices ?? [0, 1000];
  const [urlMin, urlMax] = filters?.price?.map((p) => parseInt(p.slug)) ?? [
    min,
    max,
  ];

  const [innerPrice, setInnerPrice] = useState<number[]>([urlMin, urlMax]);

  useEffect(() => {
    setInnerPrice([urlMin ?? min, urlMax ?? max]);
  }, [filters.price]);

  const isPriceSet =
    innerPrice &&
    !(min === Math.min(...innerPrice) && max === Math.max(...innerPrice));
  const additionalText = isPriceSet ? '$' + innerPrice.join('-$') : '';

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setInnerPrice([newValue[0], newValue[1]]);
    }
  };

  const handleChangeCommitted = () => {
    setFilterValues(
      'price',
      isPriceSet ? innerPrice.map((price) => ({ slug: '' + price })) : [],
    );
  };

  return (
    <FilterSectionDropdown additionalText={additionalText} filterType='price'>
      <Box p={2} display='flex' flexDirection='column'>
        {(isLoading || !filters) && (
          <Box textAlign='center' mt={1}>
            <LinearProgress />
          </Box>
        )}

        {isError && (
          <Box textAlign='center' mt={1}>
            <Typography color='error'>Something went wrong...</Typography>
          </Box>
        )}

        {(!prices || prices.length === 0) && (
          <Box textAlign='center' mt={1}>
            <Typography>No prices found.</Typography>
          </Box>
        )}
        {filters && (
          <Slider
            value={innerPrice}
            onChangeCommitted={handleChangeCommitted}
            onChange={handlePriceChange}
            getAriaLabel={() => 'Price range'}
            getAriaValueText={formatPrice}
            valueLabelDisplay='auto'
            min={min}
            max={max}
          />
        )}
      </Box>
    </FilterSectionDropdown>
  );
}
