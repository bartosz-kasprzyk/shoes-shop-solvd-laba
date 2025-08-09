'use client';

import { Box, Grid } from '@mui/material';

import ProductCard from '../ProductCard';
import type { Card } from '../ProductCard/interface';

export default function CardsContainer({ cards }: { cards: Card[] }) {
  if (!Array.isArray(cards)) {
    return <p>No cards available</p>;
  }
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
