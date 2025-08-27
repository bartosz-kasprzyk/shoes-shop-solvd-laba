'use client';

import { Link as MuiLink, Typography } from '@mui/material';
import { useSearchSuggestions } from '../../hooks/useSearch';
import type { ApiItem } from '@/shared/interfaces/ApiItem';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchStore } from '../../stores/searchStore';

export default function SearchSuggestions({ term }: { term: string }) {
  const queryClient = useQueryClient();
  const debouncedTerm = useDebounce(term, 500);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['suggestions'] });
  });
  const { setIsSearchBarOpen, setSearchValue } = useSearchStore();
  const { data, isFetched } = useSearchSuggestions(debouncedTerm);
  if (!isFetched) return null;
  if (!data || data.length < 1) return null;
  return (
    <>
      <Typography color='#5C5C5C' variant='body1' fontSize='0.9em'>
        Popular Search Terms
      </Typography>
      {data.map((d: ApiItem) => (
        <MuiLink
          component={Link}
          sx={{
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          href={`/product/${d.id}`}
          onClick={() => {
            setSearchValue(d.attributes.name ?? '');
            setIsSearchBarOpen(false);
          }}
          key={d.id}
        >
          {d.attributes.name}
        </MuiLink>
      ))}
    </>
  );
}
