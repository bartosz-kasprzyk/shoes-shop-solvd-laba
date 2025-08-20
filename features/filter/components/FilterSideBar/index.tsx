'use client';

import { Box, Divider, Typography } from '@mui/material';
import { Button } from '@/shared/components/ui';
import { useRouter } from 'next/navigation';
import PriceFilterSection from '../PriceFilterSection';
import FilterSection from '../FilterSection';
import CheckboxContainer from '../FilterValuesContainers/CheckboxContainer';
import TilesContainer from '../FilterValuesContainers/TilesContainer';
import { withSearch } from '../SearchWrapper/SearchWrapper';
import useFilterStore from '../../stores/filterStore';
import { useFiltersSlugsFromPath } from '../../hooks/useFiltersSlugsFromPath';
import useProductsCountStore from '../../stores/productCount';

export default function FilterSideBar() {
  const router = useRouter();
  const { filters, resetFilters, setFilterValues, applyFilters } =
    useFilterStore();

  const slugs = useFiltersSlugsFromPath();
  const { value: productsCount } = useProductsCountStore();
  const clearFilters = () => {
    resetFilters();
    router.push('/products/');
  };

  const handleApplyFilters = () => {
    router.push(applyFilters());
  };

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
          <Box p={2} pt={6} display={{ xs: 'none', md: 'block' }}>
            <Typography
              fontWeight='light'
              color='color-mix(in srgb, transparent, #000000ff 50%)'
              variant='body1'
            >
              {filters.category?.[0]?.name ?? 'Shoes'}
              {slugs?.search?.[0].slug && '/' + slugs?.search?.[0].slug}
            </Typography>
            <Typography noWrap variant='h5'>
              {slugs?.search?.[0].slug ?? 'Products'}
              {productsCount ? ` (${productsCount})` : ''}
            </Typography>
          </Box>
          <Divider />

          <FilterSection
            maxSelections={1}
            filterType='gender'
            Container={CheckboxContainer}
          />
          <FilterSection
            filterType='brand'
            Container={withSearch(CheckboxContainer)}
          />
          <FilterSection filterType='color' Container={CheckboxContainer} />
          <PriceFilterSection />
          <FilterSection filterType='size' Container={TilesContainer} />
          <FilterSection
            maxSelections={1}
            filterType='category'
            Container={CheckboxContainer}
          />
        </Box>

        <Box display='flex' p={2} boxSizing={'border-box'} gap={1} width='100%'>
          <Button
            variant='outline'
            color='secondary'
            onClick={clearFilters}
            sx={{ width: '100%' }}
          >
            Clear
          </Button>
          <Button onClick={handleApplyFilters} sx={{ width: '100%' }}>
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
