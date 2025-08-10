'use client';

import { Button } from '@/shared/components/ui';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { Box } from '@mui/material';

export default function ExampleScrollablePage() {
  const { showSnackbar } = useSnackbar();
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
      <Button
        onClick={() => showSnackbar('button is working!', 'success', 5000)}
      >
        Check
      </Button>

      <Button
        variant='outline'
        onClick={() => showSnackbar('button is not working!', 'error', 1000)}
      >
        Check
      </Button>
    </Box>
  );
}
