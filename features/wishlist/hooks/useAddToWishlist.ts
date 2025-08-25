import { addToWishlist } from '@/features/wishlist/utils/wishlist';
import { useSnackbar } from '@/shared/hooks/useSnackbar';

export function useAddToWishlist() {
  const { showSnackbar } = useSnackbar();

  const handleAddToWishlist = (productId: number) => {
    const result = addToWishlist(productId);
    showSnackbar(result.message, result.success ? 'success' : 'info', 5000);
  };

  return { handleAddToWishlist };
}
