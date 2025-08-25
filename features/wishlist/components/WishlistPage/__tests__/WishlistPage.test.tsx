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

jest.mock('@/features/products/components/ProductCard', () => {
  const MockProductCard = ({
    card,
    onClick,
  }: {
    card: Card;
    onClick: () => void;
  }) => (
    <div>
      <span>{card.name}</span>
      <button onClick={onClick}>remove-{card.id}</button>
    </div>
  );

  MockProductCard.displayName = 'MockProductCard';
  return MockProductCard;
});

jest.mock(
  '@/features/products/components/ProductDetails/api/productApi',
  () => ({
    fetchProductById: jest.fn((id) =>
      Promise.resolve({
        data: {
          id: Number(id),
          attributes: {
            name: `Product ${id}`,
            price: 100,
            gender: 'Men',
            images: { data: [{ id: 1, attributes: { url: '/image.jpg' } }] },
          },
        },
      }),
    ),
  }),
);

jest.mock('../../../utils/wishlist', () => ({
  getWishlist: () => getWishlistMock(),
  removeFromWishlist: (id: number) => removeFromWishlistMock(id),
}));

const showSnackbarMock = jest.fn();

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

beforeEach(() => {
  getWishlistMock.mockReset();
  removeFromWishlistMock.mockReset();
  showSnackbarMock.mockReset();
});

describe('WishlistPage', () => {
  it('renders empty wishlist message with Browse products button when no items', async () => {
    getWishlistMock.mockReturnValue([]);
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

  it('renders wishlist items', async () => {
    getWishlistMock.mockReturnValue(mockWishlist.map((p) => p.id));
    render(<WishlistPage />);

    for (const item of mockWishlist) {
      expect(await screen.findByText(item.name)).toBeInTheDocument();
    }
  });

  it('removes item from wishlist and shows snackbar alert', async () => {
    getWishlistMock.mockReturnValue([1]);
    render(<WishlistPage />);

    const removeBtn = await screen.findByRole('button', { name: 'remove-1' });
    fireEvent.click(removeBtn);

    expect(removeFromWishlistMock).toHaveBeenCalledWith(1);
    expect(showSnackbarMock).toHaveBeenCalledWith(
      'Product removed from wishlist',
      'warning',
      5000,
    );
  });
});
