import { Box, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import CartItemDetails from './CartItemDetails';
import CartItemControls from './CartItemControls';
import type { CartListItemProps } from './interface';

export default function CartListItem({
  cartItem,
  handleDeleteItem,
  handleQuantityChange,
}: CartListItemProps) {
  return (
    <Box
      sx={{
        height: { xs: 100, sm: 150, lg: 200 },
        fontSize: { xs: 12, sm: 20, lg: 30 },
        width: '100%',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: '15px', sm: '30px' },
        position: 'relative',
        borderRadius: '0px',
      }}
    >
      <Link
        component={NextLink}
        height='100%'
        display={'block'}
        sx={{ aspectRatio: '1/1' }}
        href={`/product/${cartItem.id}`}
      >
        <Box
          height='100%'
          width='auto'
          component='img'
          src={cartItem.img.src}
          alt={cartItem.name}
          title={cartItem.name}
          sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
        ></Box>
      </Link>
      <Box
        width={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        overflow='hidden'
      >
        <CartItemDetails cartItem={cartItem} />
        <CartItemControls
          quantity={cartItem.quantity}
          name={cartItem.name}
          handleQuantityChange={handleQuantityChange}
          handleDeleteItem={handleDeleteItem}
        />
      </Box>
    </Box>
  );
}
