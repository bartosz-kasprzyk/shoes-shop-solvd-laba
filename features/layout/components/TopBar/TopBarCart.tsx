'use client';

import { CartLogoIcon } from '@/shared/icons';
import { useCart } from '@/shared/hooks/useCart';
import { Badge, Button } from '@mui/material';
import Link from 'next/link';

export default function TopBarCart() {
  const { totalItems } = useCart();

  return (
    <Button
      component={Link}
      replace={false}
      href='/checkout/cart'
      sx={{
        cursor: 'pointer',
        borderRadius: '50%',
        p: 1,
        minWidth: 'auto',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <Badge
        badgeContent={totalItems}
        color='primary'
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiBadge-badge': {
            color: 'white',
          },
        }}
      >
        <CartLogoIcon />
      </Badge>
    </Button>
  );
}
