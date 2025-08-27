import { screen, act } from '@testing-library/react';
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

const showSnackbarMock = jest.fn();

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

describe('RecentlyViewedPageClient', () => {
  it('renders products from localStorage', () => {
    const mockProduct: Product = {
      id: 1,
      attributes: {
        name: 'Test product',
        description: 'Mock description',
        brand: 'Mock brand',
        categories: [],
        color: 'blue',
        gender: {
          data: {
            id: 1,
            attributes: {
              name: 'men',
            },
          },
        },
        sizes: [],
        price: 100,
        userID: 'user123',
        teamName: 'Mock Team',
        images: {
          data: [
            {
              attributes: {
                url: '/mock-image-url.png',
              },
            },
          ],
        },
      },
    };

    localStorage.setItem('recentlyViewed', JSON.stringify([mockProduct]));

    act(() => {
      renderWithProviders(<RecentlyViewedPage />);
    });

    expect(screen.getByText('Test product')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    localStorage.clear();

    act(() => {
      renderWithProviders(<RecentlyViewedPage />);
    });

    expect(
      screen.getByText(/You haven't viewed any products yet/i),
    ).toBeInTheDocument();
  });
});
