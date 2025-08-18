import type { WishlistItem } from '@/features/products/types/shared.interface';

export function getWishlist(): WishlistItem[] {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

export function addToWishlist(item: WishlistItem) {
  const wishlist = getWishlist();
  const exists = wishlist.some((p) => p.id === item.id);

  if (exists) {
    return { success: false, message: 'Product already in wishlist' };
  }

  wishlist.push(item);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  return { success: true, message: 'Product added to wishlist' };
}

export function removeFromWishlist(productId: number) {
  const wishlist = getWishlist().filter((p) => p.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
