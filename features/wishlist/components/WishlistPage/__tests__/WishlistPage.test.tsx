import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WishlistPage from '..';
import type { Card } from '@/features/products/types';

const mockWishlist: Card[] = [
  {
    id: 1,
    name: 'Product 1',
    img: { src: '/image1.jpg' },
    price: 100,
    gender: 'Men',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    img: { src: '/image2.jpg' },
    gender: 'Women',
  },
];

const getWishlistMock = jest.fn();
const removeFromWishlistMock = jest.fn();

jest.mock('../wishlist', () => ({
  getWishlist: () => getWishlistMock(),
  removeFromWishlist: (id: number) => removeFromWishlistMock(id),
}));

const showSnackbarMock = jest.fn();

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

describe('WishlistPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty wishlist message with Browse products button when no items', () => {
    getWishlistMock.mockReturnValue([]);
    render(<WishlistPage />);

    expect(
      screen.getByText(/You don't have any products in your wishlist yet/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Browse products/i }),
    ).toBeInTheDocument();
  });

  test('renders wishlist items', () => {
    getWishlistMock.mockReturnValue(mockWishlist);
    render(<WishlistPage />);

    mockWishlist.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test('removes item from wishlist and shows snackbar alert', () => {
    getWishlistMock.mockReturnValue(mockWishlist);
    render(<WishlistPage />);

    const removeButton = screen.getAllByTestId('RemoveFromWishlistIcon')[0];
    fireEvent.click(removeButton);

    expect(removeFromWishlistMock).toHaveBeenCalledWith(1);
    expect(showSnackbarMock).toHaveBeenCalledWith(
      'Product removed from wishlist!',
      'warning',
      5000,
    );
  });
});
