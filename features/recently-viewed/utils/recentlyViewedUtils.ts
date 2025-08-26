import type { ProductFromServer } from '@/features/products/types/shared.interface';

export const RECENTLY_VIEWED_LIMIT = 12;

export function updateRecentlyViewed(
  product: ProductFromServer,
  productId: number,
): void {
  const stored = localStorage.getItem('recentlyViewed');
  let storedProducts: ProductFromServer[] = stored ? JSON.parse(stored) : [];

  storedProducts = storedProducts.filter((elem) => elem.id !== productId);
  storedProducts.unshift(product);

  if (storedProducts.length > RECENTLY_VIEWED_LIMIT) {
    storedProducts.pop();
  }

  localStorage.setItem('recentlyViewed', JSON.stringify(storedProducts));
}

export function removeRecentlyViewed(productId: number) {
  const stored = localStorage.getItem('recentlyViewed');
  if (!stored) return;

  let storedProducts: ProductFromServer[] = JSON.parse(stored);
  storedProducts = storedProducts.filter((p) => p.id !== productId);

  localStorage.setItem('recentlyViewed', JSON.stringify(storedProducts));
}
