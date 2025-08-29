import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageOverlay from '..';

const renderOverlay = (
  variant: 'delete' | 'addToCart',
  onDelete?: () => void,
) =>
  render(
    <ImageOverlay variant={variant} onDelete={onDelete}>
      <img src='/test.jpg' alt='test' />
    </ImageOverlay>,
  );

describe('ImageOverlay', () => {
  it('renders children inside the overlay', () => {
    renderOverlay('addToCart');

    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('renders Add to Cart button when variant is addToCart', () => {
    renderOverlay('addToCart');

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders the Delete button when variant is delete', () => {
    renderOverlay('delete');

    expect(
      screen.getByRole('button', { name: /delete item/i }),
    ).toBeInTheDocument();
  });

  it('calls onDelete callback when Delete button is clicked', async () => {
    const onDeleteMock = jest.fn();
    renderOverlay('delete', onDeleteMock);

    await userEvent.click(screen.getByRole('button', { name: /delete item/i }));

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
