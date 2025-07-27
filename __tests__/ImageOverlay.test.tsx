import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageOverlay from '../app/components/ui/ImageOverlay';

const renderOverlay = (variant: 'addToCart' | 'delete') =>
  render(
    <ImageOverlay variant={variant}>
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

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('triggers alert on button click (Added to cart!)', async () => {
    window.alert = jest.fn();
    renderOverlay('addToCart');

    await userEvent.click(screen.getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith('Added to cart!');
  });

  it('triggers alert on button click (Deleted!)', async () => {
    window.alert = jest.fn();
    renderOverlay('delete');

    await userEvent.click(screen.getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith('Deleted!');
  });
});
