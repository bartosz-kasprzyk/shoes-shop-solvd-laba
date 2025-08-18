import { render, screen } from '@testing-library/react';
import type { Product } from '@/shared/interfaces/Product';
import RecentlyViewedPage from '../RecentlyViewedPage';

describe('RecentlyViewedPageClient', () => {
  it('renders products from localStorage', () => {
    const products: Product[] = [
      { id: 1, attributes: { name: 'Test product' } } as any,
    ];
    localStorage.setItem('recentlyViewed', JSON.stringify(products));

    render(<RecentlyViewedPage />);

    expect(screen.getByText('Test product')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    localStorage.clear();
    render(<RecentlyViewedPage />);
    expect(
      screen.getByText(/You haven't viewed any products yet/i),
    ).toBeInTheDocument();
  });
});
