'use client';

import FilterSideBar from '@/features/filter/components/FilterSideBar';
import {
  Box,
  Divider,
  Fade,
  Icon,
  IconButton,
  Slide,
  Typography,
} from '@mui/material';
import { CloseIcon, FiltersIcon } from '@/shared/icons';
import { useState } from 'react';
import useFilterStore from '../../stores/filterStore';
import { useQueries } from '@tanstack/react-query';
import { filtersSections } from '../../consts/filtersSections';
import { filterTypeToUrlSegmentMap } from '../../mappings';
import { fetchFilterValuesByFilterType } from '../../api/fetchFilterValuesByFilterType';
import { useFiltersSlugsFromPath } from '../../hooks/useFiltersSlugsFromPath';
import { useRouter } from 'next/navigation';
import type { FilterType, FilterValue } from '../../types';
import capitalizeFirst from '@/shared/utils/capitalizeFirst';
import { Button } from '@/shared/components/ui';
import useProductsCountStore from '../../stores/productCount';
import { XIcon } from '@/shared/icons/XIcon';

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { filters, removeFilterValue, applyFilters } = useFilterStore();
  const { value: productsCount } = useProductsCountStore();
  const handleRemoveFilter = (type: string, filterValues: FilterValue[]) => {
    filterValues.forEach((filterValue) =>
      removeFilterValue(type as FilterType, filterValue),
    );
    router.push(applyFilters());
  };

  const queries = useQueries({
    queries: filtersSections.map((filterType) => {
      const categoryUrlSegment = filterTypeToUrlSegmentMap[filterType];
      return {
        queryKey: [filterType],
        queryFn: () => fetchFilterValuesByFilterType(categoryUrlSegment),
      };
    }),
  });
  const slugs = useFiltersSlugsFromPath();
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Slide direction='left' in={isSideBarOpen}>
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'absolute',
            maxWidth: '100%',
          }}
          zIndex={13}
          justifyContent={'flex-end'}
          bgcolor={'color-mix(in srgb, white 80%, black 10%)'}
          flexDirection={'row'}
          top={0}
          right={0}
          height={'100%'}
        >
          <Box
            height={'100%'}
            width={'100%'}
            bgcolor='white'
            zIndex={13}
            position={'relative'}
            overflow={'hidden'}
            display={'flex'}
            flexDirection={'column'}
            maxWidth={'500px'}
          >
            <Box
              px={3.5}
              py={3}
              display={{ xs: 'flex', md: 'none' }}
              justifyContent={'end'}
            >
              <IconButton onClick={() => setIsSideBarOpen((prev) => !prev)}>
                {' '}
                <CloseIcon />
              </IconButton>
            </Box>
            <FilterSideBar />
          </Box>
        </Box>
      </Slide>
      <Fade in={isSideBarOpen}>
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            position: 'absolute',
            maxWidth: '100%',
          }}
          zIndex={12}
          justifyContent={'flex-end'}
          bgcolor={'color-mix(in srgb, white 80%, black 10%)'}
          flexDirection={'row'}
          top={0}
          right={0}
          width={'100%'}
          height={'100%'}
        ></Box>
      </Fade>

      <Box
        sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: '400px' }}
        zIndex={12}
        display={'flex'}
        justifyContent={'flex-end'}
        flexDirection={'row'}
        width={'100%'}
        top={0}
        right={0}
        height={'100%'}
      >
        <Box
          height={'100%'}
          width={'100%'}
          bgcolor='white'
          position={'relative'}
          overflow={'hidden'}
          display={'flex'}
          flexDirection={'column'}
          maxWidth={'500px'}
        >
          <FilterSideBar />
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          mx: 'auto',

          overflowY: 'auto',
          scrollbarWidth: 'none',
          overfloxX: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <Typography px={2} pt={4} pb={1} variant='h4'>
          Search results
        </Typography>
        <Divider sx={{ display: { xs: 'block', md: 'none' } }} />

        <Box
          px={1}
          py={0.5}
          position={'sticky'}
          bgcolor={'white'}
          top={'0'}
          zIndex={11}
          display={'flex'}
          flexDirection={'column'}
          gap={1}
        >
          <Box
            px={2}
            display={{ xs: 'flex', md: 'none' }}
            alignItems={'baseline'}
            justifyContent={'space-between'}
          >
            <Typography variant='h6' fontWeight={500}>
              {filters?.search?.[0]?.slug ?? 'Products '}
              {productsCount ? ` (${productsCount})` : ''}
            </Typography>
            <Box
              display={'flex'}
              alignItems={'start'}
              onClick={() => setIsSideBarOpen((prev) => !prev)}
            >
              <Typography color='#5C5C5C' fontWeight={300}>
                Filters
              </Typography>
              <Icon
                sx={{
                  height: '0.8em',
                  width: '0.8em',
                  position: 'relative',
                  overflow: 'visible',
                }}
              >
                <FiltersIcon color='#5C5C5C' />
              </Icon>
            </Box>
          </Box>
          <Box display={'flex'} flexWrap={'wrap'} py={0.5} gap={1}>
            <Box
              sx={{
                visibility: 'hidden',
                py: 0.5,
                width: 0,
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              .
            </Box>
            {Object.entries(slugs).map(([key, values]) => {
              if (key !== 'price') {
                return values.map((value) => (
                  <Button
                    variant='outline-black'
                    key={value.slug}
                    onClick={() => handleRemoveFilter(key, [value])}
                    sx={{
                      bgcolor: 'var(--color-primary)',
                      color: 'white',
                      pl: 2,
                      pr: 1,
                      py: 0.5,
                      gap: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {value.name ??
                      value.slug
                        .split('_')
                        .map((s) => capitalizeFirst(s))
                        .join(' ')}
                    <XIcon size={18} />
                  </Button>
                ));
              } else {
                return (
                  <Button
                    variant='outline-black'
                    key={'price'}
                    onClick={() => {
                      handleRemoveFilter(key, values);
                    }}
                    sx={{
                      bgcolor: 'var(--color-primary)',
                      color: 'white',
                      pl: 2,
                      pr: 1,
                      gap: 0.5,
                      py: 0.5,
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    {'$' + values.map((p) => p.slug).join('-$')}
                    <XIcon size={18} />
                  </Button>
                );
              }
            })}
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
