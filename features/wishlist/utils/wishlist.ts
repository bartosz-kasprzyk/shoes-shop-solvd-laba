export function getWishlist(): number[] {
  return JSON.parse(localStorage.getItem('wishlist') || '[]');
}

export function addToWishlist(productId: number): {
  success: boolean;
  message: string;
} {
  const wishlist = getWishlist();
  const exists = wishlist.includes(productId);

  if (exists) {
    return { success: false, message: 'Product already in wishlist' };
  }

  wishlist.push(productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  return { success: true, message: 'Product added to wishlist' };
}

export function removeFromWishlist(productId: number): void {
  const wishlist = getWishlist().filter((id) => id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
