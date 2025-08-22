'use client';

import { Box, TextField, useMediaQuery } from '@mui/material';
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SearchIcon } from '@/shared/icons';
import { useFilterSection } from '../FilterSection';
import type { FilterValue } from '../../types';

import { useTheme } from '@mui/material/styles';
type SearchContextType = {
  displayedFilterValues?: FilterValue[];
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    return { displayedFilterValues: null };
  }
  return ctx;
}

export function withSearch<T extends object>(
  ItemsContainer: React.ComponentType<T>,
) {
  return function SearchWrapper(props: T) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [searchTerm, setSearchTerm] = useState('');
    const { filterValues } = useFilterSection();

    const [height, setHeight] = useState<string>('auto');
    const contentHeightRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (contentHeightRef.current)
        setHeight(
          `${(contentHeightRef.current?.scrollHeight / filterValues.length) * 6}px`,
        );
    }, [contentHeightRef, matches]);

    const displayedFilterValues = useMemo(() => {
      if (!filterValues) return [];
      if (!searchTerm.trim()) return filterValues;
      return filterValues.filter((f) =>
        (f.name ?? f.slug).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }, [filterValues, searchTerm]);

    return (
      <Box>
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
            '& .MuiInputBase-input::placeholder': { color: '#5C5C5C' },
          }}
        />

        <Box
          ref={contentHeightRef}
          sx={{ height: height, overflowY: 'auto', scrollbarWidth: 'none' }}
        >
          <SearchContext.Provider value={{ displayedFilterValues }}>
            <ItemsContainer {...props} />
          </SearchContext.Provider>
        </Box>
      </Box>
    );
  };
}
