'use client';

import type { ProductCardProps } from './interface';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import DropDownMenu from '../ui/DropDownMenu';
import Link from 'next/link';
import ImageOverlay from '../ui/ImageOverlay';

export default function ProductCard({ card }: ProductCardProps) {
  const { img, name, price, gender } = card;
  return (
    <Card
      sx={{
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
      <DropDownMenu />
      <Link
        href={`/products/${card.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <ImageOverlay variant='addToCart'>
          <CardMedia
            component='img'
            image={img.src}
            alt={name}
            title={name}
            sx={{ aspectRatio: '320 / 380', objectFit: 'cover', width: '100%' }}
          />
        </ImageOverlay>
        <div>
          <Box
            sx={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'space-between',
            }}
          >
            <Typography fontSize={{ xs: 10, sm: 16, lg: 22 }} fontWeight={500}>
              {name}
            </Typography>
            <Typography
              fontSize={{ xs: 10, sm: 16, lg: 22 }}
              fontWeight={500}
              sx={{ ml: 'auto' }}
            >
              {price}
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
