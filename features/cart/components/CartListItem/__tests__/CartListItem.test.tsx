import React from 'react';
import { render, screen } from '@testing-library/react';
import type { CartItemForDisplay } from '../../interface';
import CartListItem from '..';

jest.mock('../CartItemDetails', () => {
  return jest.fn(() => <div data-testid='cart-item-details' />);
});

jest.mock('../CartItemControls', () => {
  const CartItemControls = ({ quantity }: { quantity: number }) => (
    <div data-testid='cart-item-controls'>
      <span>{quantity}</span>
    </div>
  );
  return CartItemControls;
});

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

describe('CartListItem', () => {
  const mockCartItem: CartItemForDisplay = {
    id: 1,
    img: { src: '/mock-image.png' },
    name: 'Test Product',
    price: 50,
    gender: 'Men',
    available: true,
    size: '10',
    quantity: 2,
  };
  const mockHandleDeleteItem = jest.fn();
  const mockHandleQuantityChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and composes child components', () => {
    render(
      <CartListItem
        cartItem={mockCartItem}
        handleDeleteItem={mockHandleDeleteItem}
        handleQuantityChange={mockHandleQuantityChange}
      />,
    );

    expect(
      screen.getByRole('link', { name: /Test Product/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Test Product/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('cart-item-details')).toBeInTheDocument();
    expect(screen.getByTestId('cart-item-controls')).toBeInTheDocument();
  });
});
