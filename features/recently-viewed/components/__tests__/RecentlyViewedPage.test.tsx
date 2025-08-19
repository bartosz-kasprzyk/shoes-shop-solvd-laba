import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests/test-utils';
import type { Product } from '@/shared/interfaces/Product';
import RecentlyViewedPage from '../RecentlyViewedPage';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock('next-auth/react', () => ({
  ...jest.requireActual('next-auth/react'),
  useSession: () => ({
    data: { user: { name: 'Test User', accessToken: 'fake-token' } },
    status: 'authenticated',
  }),
}));

describe('RecentlyViewedPageClient', () => {
  it('renders products from localStorage', () => {
    const products: Product[] = [
      { id: 1, attributes: { name: 'Test product' } } as any,
    ];
    localStorage.setItem('recentlyViewed', JSON.stringify(products));

    renderWithProviders(<RecentlyViewedPage />);

    expect(screen.getByText('Test product')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    localStorage.clear();

    renderWithProviders(<RecentlyViewedPage />);

    expect(
      screen.getByText(/You haven't viewed any products yet/i),
    ).toBeInTheDocument();
  });
});
