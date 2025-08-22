import { Grid } from '@mui/material';
import ProductCard from '../ProductCard';
import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import type { ProductsContainerProps } from '../../types/components.interface';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import type { Product } from '@/shared/interfaces/Product';
import { addToWishlist } from '@/features/wishlist/utils/wishlist';

export function ProductsContainer({ products, pages }: ProductsContainerProps) {
  const { showSnackbar } = useSnackbar();

  const handleAddToWishlist = (product: Product) => {
    const result = addToWishlist(adaptProductToCard(product));

    showSnackbar(result.message, result.success ? 'success' : 'info', 5000);
  };

  const items = products ? products : pages.flatMap((page) => page.data);
  return (
    <Grid container spacing={{ xs: 2, md: 2, lg: 3, xl: 4 }}>
      {items.map((product) => (
        <Grid key={product.id} size={{ xs: 6, md: 4, lg: 3, xl: 3 }}>
          <ProductCard
            card={adaptProductToCard(product)}
            variant='addToWishlist'
            onClick={() => handleAddToWishlist(product)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsContainer;
