import type { ProductFromServer } from '@/features/products/types/shared.interface';

export const RECENTLY_VIEWED_LIMIT = 12;

export function updateRecentlyViewed(
  product: ProductData,
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
