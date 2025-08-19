import { render, screen, fireEvent } from '@testing-library/react';
import WishlistButton from '..';

describe('WishlistButton', () => {
  it('renders AddToWishlistIcon when onRemove is not provided', () => {
    const onAddMock = jest.fn();
    render(<WishlistButton onAdd={onAddMock} />);

    expect(screen.getByTestId('AddToWishlistIcon')).toBeInTheDocument();
  });

  it('renders RemoveFromWishlistIcon when onRemove is provided', () => {
    const onRemoveMock = jest.fn();
    render(<WishlistButton onRemove={onRemoveMock} />);

    expect(screen.getByTestId('RemoveFromWishlistIcon')).toBeInTheDocument();
  });

  it('calls onAdd when clicked and onRemove is not provided', () => {
    const onAddMock = jest.fn();
    render(<WishlistButton onAdd={onAddMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onAddMock).toHaveBeenCalledTimes(1);
  });

  it('calls onRemove when clicked and onRemove is provided', () => {
    const onRemoveMock = jest.fn();
    render(<WishlistButton onRemove={onRemoveMock} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onRemoveMock).toHaveBeenCalledTimes(1);
  });
});
