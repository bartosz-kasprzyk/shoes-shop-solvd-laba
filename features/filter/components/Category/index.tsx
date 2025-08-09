'use client';

import { Box, Checkbox, Grid, TextField, Typography } from '@mui/material';
import { SearchIcon } from '@/shared/icons';
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { useCategoryByName } from '../../hooks/useCategoryByName';
import { useCategoryCounts } from '../../hooks/useCategoryCounts';
import type { CategoryProps } from './types';

export default function Category({
  filters,
  categoryName,
  selected,
  onToggle,
}: CategoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: subCategories,
    isLoading,
    isError,
  } = useCategoryByName(categoryName, filters);

  const [height, setHeight] = useState('auto');
  const contentHeightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoryName === 'Brand')
      if (contentHeightRef.current)
        setHeight(`${contentHeightRef.current?.offsetHeight * 6}px`);
  });

  const subCategoriesNames = useMemo(
    () =>
      subCategories
        ? subCategories.map(
            (subCategory) =>
              subCategory.attributes.name ?? subCategory.attributes.value ?? '',
          )
        : [],
    [subCategories],
  );

  const subCategoriesForCounting = useMemo(
    () => (categoryName !== 'Size' ? subCategoriesNames : []),
    [subCategoriesNames],
  );
  const categoriesWithCount = useCategoryCounts(
    subCategoriesForCounting,
    categoryName,
    filters,
  );
  const deferredCounts = useDeferredValue(categoriesWithCount);

  const displayedCategoriesNames = useMemo(() => {
    if (!subCategoriesNames) return [];
    if (!searchTerm.trim()) return subCategoriesNames;

    return subCategoriesNames.filter((sub) =>
      (sub ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [subCategoriesNames, searchTerm]);

  if (isLoading) {
    return (
      <Box textAlign='center' mt={8}>
        a
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

  if (!subCategories || subCategories.length === 0) {
    return (
      <Box textAlign='center' mt={8}>
        <Typography>No colors found.</Typography>
      </Box>
    );
  }

  if (!searchTerm) {
    displayedCategoriesNames.sort((a, b) => {
      const valA = parseInt(a ?? '0');
      const valB = parseInt(b ?? '0');
      return valA - valB;
    });
  }

  return (
    <Box mt={1}>
      {categoryName === 'Brand' && (
        <TextField
          fullWidth
          placeholder='Search'
          size='small'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <Box sx={{ mr: 1 }}>
                  <SearchIcon />
                </Box>
              ),
            },
          }}
          sx={{
            marginBottom: 3,
            marginTop: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '9999px',
              borderColor: '#494949',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#5C5C5C',
            },
          }}
        />
      )}
      <Box height={height} sx={{ overflowY: 'auto', scrollbarWidth: 'none' }}>
        <Grid container>
          {displayedCategoriesNames.map((category) => {
            const name = '' + (category ?? '');
            const isSelected = selected.includes(name);
            const count =
              deferredCounts[name] > 0 && !isSelected
                ? `(${selected.length > 0 ? '+' : ''}${deferredCounts[name]})`
                : '';
            return (
              <Grid width={categoryName !== 'Size' ? '100%' : '30%'} key={name}>
                {categoryName !== 'Size' ? (
                  <Box
                    ref={contentHeightRef}
                    display='flex'
                    alignItems='center'
                    gap={1}
                    component='label'
                    sx={{ cursor: 'pointer' }}
                  >
                    <Checkbox
                      sx={{ px: 0 }}
                      checked={isSelected}
                      onChange={() => onToggle(name)}
                    />
                    {categoryName === 'Color' && (
                      <Box
                        width={22}
                        height={22}
                        borderRadius='50%'
                        bgcolor={name}
                        border='1px solid #ccc'
                      />
                    )}
                    <Typography>{name}</Typography>
                    <Typography color='#6E7278'>{count}</Typography>
                  </Box>
                ) : (
                  <Box
                    display='flex'
                    p={1}
                    m={0.5}
                    boxSizing={'border-box'}
                    alignItems='center'
                    gap={1}
                    component='label'
                    border={1}
                    borderColor={
                      isSelected
                        ? 'black'
                        : 'color-mix(in srgb, black 30%, transparent)'
                    }
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onToggle(name)}
                  >
                    <Typography width={'100%'} textAlign={'center'}>
                      {name}
                    </Typography>
                  </Box>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
