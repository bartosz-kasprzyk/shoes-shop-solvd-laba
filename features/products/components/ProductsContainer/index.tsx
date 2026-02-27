import { Grid } from '@mui/material';
import ProductCard from '../ProductCard';
import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import type { ProductsContainerProps } from '../../types/components.interface';

export function ProductsContainer({
  products,
  pages,
  variant,
  onProductAction,
  wishlistIds,
}: ProductsContainerProps) {
  const items = products ? products : pages.flatMap((page) => page.data);
  return (
    <Grid container spacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}>
      {items.map((product) => (
        <Grid key={product.id} item xs={6} md={4} lg={3} xl={3}>
          <ProductCard
            card={adaptProductToCard(product)}
            variant={variant}
            onClick={
              onProductAction ? () => onProductAction(product.id) : undefined
            }
            filled={wishlistIds?.has(product.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsContainer;
