import { Grid } from '@mui/material';
import ProductCard from '../ProductCard';
import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import type { ProductsContainerProps } from '../../types/components.interface';

export function ProductsContainer({
  products,
  pages,
  withOverlay,
}: ProductsContainerProps) {
  const items = products ? products : pages.flatMap((page) => page.data);
  return (
    <Grid container spacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}>
      {items.map((product) => (
        <Grid key={product.id} size={{ xs: 6, md: 6, lg: 4, xl: 3 }}>
          <ProductCard
            card={adaptProductToCard(product)}
            withOverlay={withOverlay}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsContainer;
