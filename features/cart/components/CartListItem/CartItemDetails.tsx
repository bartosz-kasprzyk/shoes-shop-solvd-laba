import { Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';
import React from 'react';
import type { CartItemDetailsProps } from './interface';

export default function CartItemDetails({ cartItem }: CartItemDetailsProps) {
  return (
    <Box>
      <Box
        fontSize={'1em'}
        fontWeight={500}
        lineHeight={'normal'}
        gap={4}
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          lineHeight={'inherit'}
          padding={0}
          whiteSpace={'nowrap'}
          overflow='hidden'
          textOverflow='ellipsis'
          fontSize={'inherit'}
          fontWeight={'inherit'}
        >
          <Link
            component={NextLink}
            lineHeight='normal'
            mb={0}
            color='inherit'
            href={`/product/${cartItem.id}`}
            underline='hover'
          >
            {cartItem.name}
          </Link>
        </Typography>

        <Typography
          lineHeight={'inherit'}
          fontSize={'inherit'}
          fontWeight={'inherit'}
          pr={1}
        >
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(cartItem.quantity * cartItem.price)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          fontSize={'0.7em'}
          fontWeight={500}
          color='color-mix(in srgb, black 60%, transparent)'
          component='p'
          flexGrow={1}
          display={{ xs: 'none', sm: 'block' }}
        >
          {cartItem.gender}&apos;s Shoes | Size&nbsp;{cartItem.size}
        </Typography>
        <Box display={{ xs: 'flex', sm: 'none' }} flexDirection={'column'}>
          <Typography
            fontSize={'1em'}
            lineHeight={'inherit'}
            fontWeight={500}
            color='color-mix(in srgb, black 60%, transparent)'
            component='p'
            flexGrow={1}
            py={'1px'}
          >
            {cartItem.gender}&apos;s Shoes
          </Typography>
          <Typography
            fontSize={'1em'}
            lineHeight={'inherit'}
            fontWeight={500}
            color='color-mix(in srgb, black 60%, transparent)'
            component='p'
            flexGrow={1}
          >
            Size&nbsp;{cartItem.size}
          </Typography>
        </Box>
        {cartItem.quantity > 1 && (
          <Typography
            lineHeight={'inherit'}
            fontSize={{ xs: '0.7em', sm: '0.45em' }}
            fontWeight={'inherit'}
            color='color-mix(in srgb, black 60%, transparent)'
            pr={1}
            pl={2}
            pt={0.5}
            textAlign={'right'}
          >
            {`Unit price: ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(cartItem.price)}`}
          </Typography>
        )}
      </Box>
      <Typography
        display={{ xs: 'none', sm: 'block' }}
        fontSize='0.85em'
        fontWeight={'600'}
        color='var(--color-primary)'
        component='p'
      >
        {cartItem.available ? 'In Stock' : 'Out of Stock'}
      </Typography>
    </Box>
  );
}
