const keyFor = (userId?: string) => `wishlist_${userId ?? 'guest'}`;

export function getWishlist(userId?: string): number[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(keyFor(userId)) || '[]');
}

export function addToWishlist(productId: number, userId?: string) {
  const wishlist = getWishlist(userId);
  wishlist.push(productId);
  localStorage.setItem(keyFor(userId), JSON.stringify(wishlist));
}

export function removeFromWishlist(productId: number, userId?: string): void {
  const wishlist = getWishlist(userId).filter((id) => id !== productId);
  localStorage.setItem(keyFor(userId), JSON.stringify(wishlist));
}
