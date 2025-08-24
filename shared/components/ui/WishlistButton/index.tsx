'use client';

import { IconButton } from '@mui/material';
import RemoveFromWishlistIcon from '@/shared/icons/RemoveFromWishlistIcon';
import AddToWishlistIcon from '@/shared/icons/AddToWishlistIcon';
import type { WishlistButtonProps } from './interface';

export default function WishlistButton({
  onClick,
  operation,
}: WishlistButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: { xs: '35px', md: '40px', lg: '44px' },
        height: { xs: '35px', md: '40px', lg: '44px' },
        padding: '10px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        color: '#292D32',
        transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out',

        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          color: 'var(--color-primary)',
        },

        '&:active svg': {
          transform: 'scale(1.1)',
        },
      }}
    >
      {operation === 'remove' ? (
        <RemoveFromWishlistIcon />
      ) : (
        <AddToWishlistIcon />
      )}
    </IconButton>
  );
}
