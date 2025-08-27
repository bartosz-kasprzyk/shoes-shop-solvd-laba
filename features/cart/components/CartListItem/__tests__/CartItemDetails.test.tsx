import React from 'react';
import { render, screen } from '@testing-library/react';
import CartItemDetails from '../CartItemDetails';
import type { CartItemForDisplay } from '../../interface';

jest.mock('next/link', () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return Link;
});

describe('CartItemDetails', () => {
  const mockCartItem: CartItemForDisplay = {
    id: 1,
    img: { src: '/mock-image.png' },
    name: 'Test Product',
    price: 50,
    gender: 'Men',
    available: true,
    size: '35',
    quantity: 2,
  };

  it('renders product details correctly', () => {
    render(<CartItemDetails cartItem={mockCartItem} />);

    const productNameLink = screen.getByRole('link', { name: /test product/i });
    expect(productNameLink).toBeInTheDocument();
    expect(productNameLink).toHaveAttribute('href', '/product/1');

    expect(screen.getByText('$100.00')).toBeInTheDocument();

    expect(screen.getByText("Men's Shoes | Size 35")).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
  });

  it('displays "Out of Stock" when item is not available', () => {
    const outOfStockItem = { ...mockCartItem, available: false };
    render(<CartItemDetails cartItem={outOfStockItem} />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});
