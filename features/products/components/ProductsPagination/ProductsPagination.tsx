'use client';

import {
  Box,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface ProductsPaginationProps {
  totalProducts: number;
  currentPage: number;
  pageSize: number;
}

const PAGE_SIZE_OPTIONS = [
  { value: 12, label: '12' },
  { value: 24, label: '24' },
  { value: 48, label: '48' },
  { value: 0, label: 'All' },
];

export default function ProductsPagination({
  totalProducts,
  currentPage,
  pageSize,
}: ProductsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = pageSize === 0 ? 1 : Math.ceil(totalProducts / pageSize);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const queryString = createQueryString('page', value.toString());
    router.push(`/products?${queryString}`, { scroll: false });
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    const params = new URLSearchParams(searchParams.toString());

    if (newPageSize === 0) {
      params.delete('pageSize');
      params.delete('page');
    } else {
      params.set('pageSize', newPageSize.toString());
      params.set('page', '1');
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  if (totalProducts === 0) {
    return null;
  }

  const startItem = pageSize === 0 ? 1 : (currentPage - 1) * pageSize + 1;
  const endItem =
    pageSize === 0
      ? totalProducts
      : Math.min(currentPage * pageSize, totalProducts);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 4,
        mb: 2,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          Showing {startItem}-{endItem} of {totalProducts} products
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant='body2' color='text.secondary'>
            Show:
          </Typography>
          <FormControl size='small' sx={{ minWidth: 80 }}>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              variant='outlined'
              sx={{ height: 32 }}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {pageSize > 0 && totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color='primary'
            shape='rounded'
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
            sx={{
              '& .Mui-selected': {
                color: '#fff !Important',
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
