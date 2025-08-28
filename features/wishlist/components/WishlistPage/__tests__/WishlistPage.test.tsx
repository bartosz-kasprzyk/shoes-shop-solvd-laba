import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import WishlistPage from '..';
import { useWishlistStore } from '@/features/wishlist/stores/wishlistStore';
import { useSession } from 'next-auth/react';

const showSnackbarMock = jest.fn();
const removeFromWishlistMock = jest.fn<
  void,
  [number, string?, typeof showSnackbarMock?]
>();
const setInitialWishlistMock = jest.fn();

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

(useSession as jest.Mock).mockReturnValue({
  data: { user: { id: '1', accessToken: 'fake' } },
});

jest.mock('@/features/wishlist/stores/wishlistStore', () => ({
  useWishlistStore: jest.fn(),
}));

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

jest.mock('@/features/products/components/ProductCard', () => ({
  __esModule: true,
  default: ({ card, onClick }: any) => (
    <div>
      <span>{card.name}</span>
      <button onClick={onClick}>remove-{card.id}</button>
    </div>
  ),
}));

jest.mock(
  '@/features/products/components/ProductDetails/api/productApi',
  () => ({
    fetchProductById: jest.fn((id: string) =>
      Promise.resolve({
        data: {
          id: Number(id),
          attributes: {
            name: `Product ${id}`,
            images: { data: [{ attributes: { url: `/image${id}.jpg` } }] },
            price: id === '1' ? 100 : 200,
            gender: id === '1' ? 'Men' : 'Women',
          },
        },
      }),
    ),
  }),
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('WishlistPage', () => {
  it('renders empty wishlist message with Browse products button when no items', async () => {
    (useWishlistStore as unknown as jest.Mock).mockReturnValue({
      wishlistIds: new Set(),
      removeFromWishlist: removeFromWishlistMock,
      setInitialWishlist: jest.fn(),
    });

    render(<WishlistPage />);

    expect(
      await screen.findByText(
        /You don't have any products in your wishlist yet/i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Browse products/i }),
    ).toBeInTheDocument();
  });

  it('renders all wishlist items', async () => {
    (useWishlistStore as unknown as jest.Mock).mockReturnValue({
      wishlistIds: new Set([1, 2]),
      removeFromWishlist: removeFromWishlistMock,
      setInitialWishlist: setInitialWishlistMock,
    });

    render(<WishlistPage />);

    await waitFor(() =>
      expect(screen.getByText('Product 1')).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByText('Product 2')).toBeInTheDocument(),
    );
  });

  it('removes an item from wishlist and shows snackbar alert', async () => {
    render(<WishlistPage />);

    const removeBtn = await screen.findByRole('button', { name: 'remove-1' });
    fireEvent.click(removeBtn);

    expect(removeFromWishlistMock).toHaveBeenCalledWith(
      1,
      '1',
      showSnackbarMock,
    );
  });
});
