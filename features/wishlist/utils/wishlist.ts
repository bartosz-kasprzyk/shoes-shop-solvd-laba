import type { Card } from '@/features/products/types';

function getWishlist(): Card[] {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

export function addToWishlist(product: Card) {
  const wishlist = getWishlist();
  const exists = wishlist.some((p) => p.id === product.id);

  if (exists) {
    return { success: false, message: 'Product already in wishlist' };
  }

  wishlist.push(product);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  return { success: true, message: 'Product added to wishlist' };
}

export function removeFromWishlist(productId: number) {
  const wishlist = getWishlist().filter((p) => p.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
