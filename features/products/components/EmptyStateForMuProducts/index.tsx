import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import CartIcon from '../../../../shared/icons/CartIcon';
import { Button } from '@/shared/components/ui';

export default function EmptyStateForMuProducts() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          backgroundColor: '#f3f4f6',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 3,
        }}
      >
        <CartIcon />
      </Box>
      <Typography
        variant='h6'
        sx={{
          fontWeight: 600,
          marginBottom: 1,
          color: '#1f2937',
          fontSize: { xs: 16, lg: 22 },
        }}
      >
        You don&apos;t have any products yet
      </Typography>
      <Typography
        variant='body2'
        sx={{
          color: '#6b7280',
          marginBottom: 4,
          maxWidth: '360px',
          fontSize: { xs: 14, lg: 18 },
        }}
      >
        Post can contain video, images and text
      </Typography>

      <Link href='/my-products/add-product' passHref>
        <Button variant='primary'>Add product</Button>
      </Link>
    </Box>
  );
}
