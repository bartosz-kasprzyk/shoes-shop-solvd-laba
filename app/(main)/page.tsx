'use client';

import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

function getLongArray(len: number) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const signedOut = searchParams.get('signedOut');
    if (signedOut === 'true') {
      showSnackbar('You have been signed out successfully', 'success');
      // Clean up the URL parameter
      router.replace('/');
    }
  }, [searchParams, router, showSnackbar]);

  return (
    <Box //scrollable component example
      sx={{
        overflowY: 'scroll', //or auto or hidden - depends what you want
        height: '100%', // important to set it

        p: 9,
        boxSizing: 'border-box', //important when you add padding or margin

        overflowX: 'hidden', // not that important but prevents horizontall scrollbar
      }}
    >
      {getLongArray(100).map((elem) => (
        <Box key={elem}>{elem}</Box>
      ))}
    </Box>
  );
}
