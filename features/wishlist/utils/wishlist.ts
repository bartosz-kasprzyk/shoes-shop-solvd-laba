export function getWishlist(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

export function addToWishlist(productId: number) {
  const wishlist = getWishlist();

  wishlist.push(productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

export function removeFromWishlist(productId: number): void {
  const wishlist = getWishlist().filter((id) => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
