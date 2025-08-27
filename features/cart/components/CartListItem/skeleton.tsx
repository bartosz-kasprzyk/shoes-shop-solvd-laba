'use client';

import { Box, Skeleton } from '@mui/material';

export default function CartListItemSkeleton() {
  return (
    <Box
      sx={{
        height: { xs: 100, sm: 150, lg: 200 },
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: '15px', sm: '45px' },
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <Skeleton
        variant='rectangular'
        height='100%'
        sx={{ aspectRatio: '1/1' }}
      />

      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: 1,
            }}
          >
            <Skeleton width='60%' height={20} />
            <Skeleton width='20%' height={20} />
          </Box>
          <Skeleton width='40%' height={15} />
          <Skeleton width='30%' height={15} sx={{ mt: 0.5 }} />
        </Box>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          mt={2}
        >
          <Box display='flex' gap={1}>
            <Skeleton variant='circular' width={30} height={30} />
            <Skeleton width={30} height={30} />
            <Skeleton variant='circular' width={30} height={30} />
          </Box>
          <Skeleton width={60} height={30} />
        </Box>
      </Box>
    </Box>
  );
}
