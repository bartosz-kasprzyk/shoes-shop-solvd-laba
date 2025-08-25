import { adaptProductToCard } from '@/features/products/components/ProductCard/ProductCard.adapter';
import type { ProductFromServer } from '@/features/products/types/shared.interface';
import { addToWishlist } from '@/features/wishlist/utils/wishlist';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import type { Product } from '@/shared/interfaces/Product';

export function useAddToWishlist() {
  const { showSnackbar } = useSnackbar();

  const handleAddToWishlist = (product: Product | ProductFromServer) => {
    const result = addToWishlist(adaptProductToCard(product));
    showSnackbar(result.message, result.success ? 'success' : 'info', 5000);
  };

  return { handleAddToWishlist };
}
