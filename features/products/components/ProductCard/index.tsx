'use client';

import { Card, CardMedia, Typography, Box } from '@mui/material';
import { DropDownMenu } from '@/shared/components/ui';
import Link from 'next/link';
import type { ProductCardProps } from '../../types';
import WishlistButton from '@/shared/components/ui/WishlistButton';

export default function ProductCard({
  card,
  variant,
  onClick,
}: ProductCardProps) {
  const { img, name, price, gender, id } = card;

  function renderButton() {
    switch (variant) {
      case 'dropdown':
        return <DropDownMenu id={id} />;
      case 'removeFromWishlist':
        return <WishlistButton operation='remove' onClick={onClick} />;
      case 'addToWishlist':
        return onClick && <WishlistButton operation='add' onClick={onClick} />;
      default:
        return null;
    }
  }

  return (
    <Card
      sx={{
        maxWidth: '320px',
        maxHeight: '443px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        position: 'relative',
        transition: 'all 0.3s ease',
        border: '1px solid transparent',
        padding: '5px',
        borderRadius: 0,
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      {variant && renderButton()}
      <Link
        href={`/product/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component='img'
          image={img.src}
          alt={name}
          title={name}
          sx={{
            aspectRatio: '320 / 380',
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <div>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              width: '100%',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            <Typography
              width={'100%'}
              overflow='hidden'
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              whiteSpace={'nowrap'}
              textOverflow={'ellipsis'}
              fontWeight={500}
            >
              {name}
            </Typography>
            <Typography
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              fontWeight={500}
              sx={{ ml: 'auto' }}
            >
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(price)}
            </Typography>
          </Box>
          <Typography
            fontSize={{ xs: 9, sm: 12, lg: 18 }}
            fontWeight={500}
            color='#5C5C5C'
            component='p'
          >
            {`${gender}'s Shoes`}
          </Typography>
        </div>
      </Link>
    </Card>
  );
}
