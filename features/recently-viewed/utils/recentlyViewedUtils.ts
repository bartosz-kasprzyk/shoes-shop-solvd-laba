import type { ProductFromServer } from '@/features/products/types/shared.interface';

export const RECENTLY_VIEWED_LIMIT = 12;

function getRecentlyViewedKey(userId?: string) {
  return userId ? `recentlyViewed:${userId}` : 'recentlyViewed:guest';
}

export function updateRecentlyViewed(
  product: ProductFromServer,
  productId: number,
  userId?: string,
): void {
  const key = getRecentlyViewedKey(userId);
  const stored = localStorage.getItem(key);
  let storedProducts: ProductFromServer[] = stored ? JSON.parse(stored) : [];

  storedProducts = storedProducts.filter((elem) => elem.id !== productId);
  storedProducts.unshift(product);

  if (storedProducts.length > RECENTLY_VIEWED_LIMIT) {
    storedProducts.pop();
  }

  localStorage.setItem(key, JSON.stringify(storedProducts));
}

export function removeRecentlyViewed(productId: number, userId?: string) {
  const key = getRecentlyViewedKey(userId);
  const stored = localStorage.getItem(key);
  if (!stored) return;

  let storedProducts: ProductFromServer[] = JSON.parse(stored);
  storedProducts = storedProducts.filter((p) => p.id !== productId);

  localStorage.setItem(key, JSON.stringify(storedProducts));
}
