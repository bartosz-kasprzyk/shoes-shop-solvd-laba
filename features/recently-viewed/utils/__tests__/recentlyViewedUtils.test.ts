import type { ProductFromServer } from '@/features/products/types/shared.interface';
import {
  RECENTLY_VIEWED_LIMIT,
  updateRecentlyViewed,
} from '../recentlyViewedUtils';

describe('updateRecentlyViewed', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores product in localStorage when viewed', () => {
    const product: ProductFromServer = {
      id: 1,
      attributes: { name: 'Test' },
    } as any;

    updateRecentlyViewed(product, product.id);

    const stored = JSON.parse(localStorage.getItem('recentlyViewed')!);
    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(1);
  });

  it('removes oldest products when limit is exceeded', () => {
    const limit = RECENTLY_VIEWED_LIMIT;
    const amountOfExtraProducts = 3;
    for (let i = 1; i <= limit + amountOfExtraProducts; i++) {
      const product: ProductFromServer = {
        id: i,
        attributes: { name: `Test ${i}` },
      } as any;
      updateRecentlyViewed(product, product.id);
    }

    const stored = JSON.parse(localStorage.getItem('recentlyViewed')!);
    expect(stored.length).toBe(limit);
    expect(stored[0].id).toBe(limit + amountOfExtraProducts);
    expect(stored[stored.length - 1].id).toBe(amountOfExtraProducts + 1);
  });
});
