import { screen, act } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests/test-utils';
import RecentlyViewedPage from '../RecentlyViewedPage';
import useUser from '@/shared/hooks/useUser';
import type { Product } from '@/shared/interfaces/Product';

jest.mock('@/shared/hooks/useUser');

const mockedUserId = '1234';

const showSnackbarMock = jest.fn();
jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

describe('RecentlyViewedPageClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders products from localStorage', () => {
    const mockProduct: Product = {
      id: 1,
      attributes: {
        name: 'Test product',
        description: 'Mock description',
        brand: 'Mock brand',
        categories: [],
        color: 'blue',
        gender: { data: { id: 1, attributes: { name: 'men' } } },
        sizes: [],
        price: 100,
        userID: mockedUserId,
        teamName: 'Mock Team',
        images: { data: [{ attributes: { url: '/mock-image-url.png' } }] },
      },
    };

    (useUser as jest.Mock).mockReturnValue({
      session: { user: { id: mockedUserId } },
    });

    jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) =>
        key === `recentlyViewed:${mockedUserId}`
          ? JSON.stringify([mockProduct])
          : null,
      );

    act(() => {
      renderWithProviders(<RecentlyViewedPage />);
    });

    expect(screen.getByText('Test product')).toBeInTheDocument();
  });

  it('shows empty state when no products', () => {
    (useUser as jest.Mock).mockReturnValue({ session: null });

    act(() => {
      renderWithProviders(<RecentlyViewedPage />);
    });

    expect(
      screen.getByText(/You haven't viewed any products yet/i),
    ).toBeInTheDocument();
  });
});
