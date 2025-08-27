import type { ProductFromServer } from '@/features/products/types/shared.interface';
import {
  RECENTLY_VIEWED_LIMIT,
  updateRecentlyViewed,
} from '../recentlyViewedUtils';

const createMockProduct = (id: number, name: string): ProductFromServer => ({
  id,
  attributes: {
    name,
    description: 'Mock description',
    brand: {
      data: {
        id: 1,
        attributes: { name: 'Mock Brand' },
      },
    },
    categories: { data: [] },
    color: {
      data: {
        id: 1,
        attributes: { name: 'Mock Color' },
      },
    },
    gender: {
      data: {
        id: 1,
        attributes: { name: 'men' },
      },
    },
    sizes: { data: [] },
    price: 100,
    userID: 'mock-user-id',
    teamName: 'Mock Team',
    images: {
      data: [],
    },
  },
});

describe('updateRecentlyViewed', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores product in localStorage when viewed', () => {
    const product = createMockProduct(1, 'Test');

    updateRecentlyViewed(product, product.id);

    const storedString = localStorage.getItem('recentlyViewed');
    expect(storedString).not.toBeNull();

    const stored = JSON.parse(storedString as string);

    expect(stored.length).toBe(1);
    expect(stored[0].id).toBe(1);
  });

  it('removes oldest products when limit is exceeded', () => {
    const limit = RECENTLY_VIEWED_LIMIT;
    const amountOfExtraProducts = 3;
    for (let i = 1; i <= limit + amountOfExtraProducts; i++) {
      const product = createMockProduct(i, `Test ${i}`);
      updateRecentlyViewed(product, product.id);
    }

    const storedString = localStorage.getItem('recentlyViewed');
    expect(storedString).not.toBeNull();
    const stored = storedString ? JSON.parse(storedString) : [];

    expect(stored.length).toBe(limit);
    expect(stored[0].id).toBe(limit + amountOfExtraProducts);
    expect(stored[stored.length - 1].id).toBe(amountOfExtraProducts + 1);
  });
});
