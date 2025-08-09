'use client';

import { Box, Divider, Typography } from '@mui/material';
import { useReducer, useState } from 'react';
import { Button } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';
import CategoryWrapper from '../CategoryWrapper';
import PriceCategory from '../PriceCategory';
import Category from '../Category';
import type { FilterCategoryWithoutPrices } from '../../types/FilterCategory';
import filtersReducer from '../../reducers/reducer';
import { useInitialFilters } from '../../utils/useInitialFilters';
import { adaptFiltersToFetchParams } from '../../utils/adaptFiltersToFetchParams';

export default function FilterSideBar() {
  const router = useRouter();
  const initialFilters = useInitialFilters();
  const [state, dispatch] = useReducer(filtersReducer, initialFilters);
  const filters = adaptFiltersToFetchParams(initialFilters);
  const [isPriceControlled, setIsPriceControlled] = useState(false);
  const additionalPriceText = state.Price.set
    ? `$${state.Price.range[0]} - $${state.Price.range[1]}`
    : '';

  const applyFilters = () => {
    const segments: string[] = [];

    (
      ['Gender', 'Brand', 'Color', 'Size'] as FilterCategoryWithoutPrices[]
    ).forEach((cat) => {
      const values = state[cat];
      if (values.length > 0) {
        const segment = `${cat}:${values.map((v) => ('' + v).replaceAll(' ', '_')).join('-')}`;
        segments.push(segment);
      }
    });

    if (state.Price.set) {
      const [min, max] = state.Price.range;
      segments.push(`Price:${min}-${max}`);
    }

    if (state?.searchTerm?.trim()) {
      segments.push(`q:${state.searchTerm.trim().replaceAll(' ', '_')}`);
    }

    const path = `/products/${segments.join('/')}`;

    router.push(path);
  };

  const filtersConfig = [
    { category: 'Gender' as const },
    { category: 'Brand' as const },
    { category: 'Price' as const, isPrice: true },
    { category: 'Color' as const },
    { category: 'Size' as const },
  ];

  return (
    <Box
      overflow={'hidden'}
      sx={{ width: '100%', height: '100%', backgroundColor: 'white' }}
    >
      <Box
        overflow={'hidden'}
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            scrollbarGutter: 'stable',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {state.searchTerm && (
            <Box display={{ xs: 'none', md: 'block' }}>
              <Typography p={2} variant='h5'>
                {state.searchTerm}
              </Typography>
              <Divider />
            </Box>
          )}

          {filtersConfig.map(({ category, isPrice }) => (
            <Box key={category}>
              <CategoryWrapper
                filtersCount={
                  isPrice
                    ? undefined
                    : (
                        state[
                          category as FilterCategoryWithoutPrices
                        ] as string[]
                      ).length
                }
                categoryName={category}
                additionalText={isPrice ? additionalPriceText : undefined}
              >
                {isPrice ? (
                  <PriceCategory
                    priceSet={state.Price.set}
                    isControlled={isPriceControlled}
                    setIsControlled={setIsPriceControlled}
                    handleChange={(range, set) =>
                      dispatch({
                        type: 'SET_PRICE',
                        range: range as [number, number],
                        set,
                      })
                    }
                    filters={filters}
                  />
                ) : (
                  <Category
                    filters={filters}
                    categoryName={category}
                    selected={state[category as FilterCategoryWithoutPrices]}
                    onToggle={(val) =>
                      dispatch({ type: 'TOGGLE', category, value: val })
                    }
                  />
                )}
              </CategoryWrapper>
              <Divider />
            </Box>
          ))}
        </Box>

        <Box display='flex' p={2} boxSizing={'border-box'} gap={1} width='100%'>
          <Button
            variant='outline'
            color='secondary'
            onClick={() => {
              dispatch({ type: 'CLEAR' });
              setIsPriceControlled(false);
            }}
            sx={{ width: '100%' }}
          >
            Clear
          </Button>
          <Button onClick={applyFilters} sx={{ width: '100%' }}>
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
