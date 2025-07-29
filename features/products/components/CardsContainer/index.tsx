'use client';

import cards from '@/shared/mocks/mockCards';
import { Box, Grid } from '@mui/material';
import ProductCard from '../ProductCard';

export default function CardsContainer() {
  return (
    <Box
      sx={{
        maxWidth: 1487,
        mx: 'auto',
      }}
    >
      <Grid container spacing={{ xs: 2, lg: 3, xl: 8 }}>
        {cards.map((card) => (
          <Grid key={card.id} size={{ xs: 6, md: 4, lg: 3 }}>
            <ProductCard card={card} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
