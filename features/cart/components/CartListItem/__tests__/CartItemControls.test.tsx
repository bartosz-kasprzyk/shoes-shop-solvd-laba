import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartItemControls from '../CartItemControls';

jest.mock('@/features/products/components/DeleteConfirmationModal', () => {
  return jest.fn(({ isOpen, onClose, onDelete, text }) =>
    isOpen ? (
      <div data-testid='delete-modal'>
        <span>{text}</span>
        <button onClick={onDelete}>Confirm Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
  );
});

describe('CartItemControls', () => {
  const mockHandleQuantityChange = jest.fn();
  const mockHandleDeleteItem = jest.fn();
  const mockName = 'Test Product';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quantity and controls correctly', () => {
    render(
      <CartItemControls
        quantity={2}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls handleQuantityChange when the plus button is clicked', () => {
    render(
      <CartItemControls
        quantity={2}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /increase quantity/i }));
    expect(mockHandleQuantityChange).toHaveBeenCalledWith(3);
  });

  it('calls handleQuantityChange when the minus button is clicked and quantity > 1', () => {
    render(
      <CartItemControls
        quantity={2}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
    expect(mockHandleQuantityChange).toHaveBeenCalledWith(1);
  });

  it('opens modal when minus button is clicked and quantity is 1', async () => {
    render(
      <CartItemControls
        quantity={1}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /decrease quantity/i }));
    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });
    expect(
      screen.getByText(/are you sure you want to remove test product/i),
    ).toBeInTheDocument();
  });

  it('opens modal when delete button is clicked', async () => {
    render(
      <CartItemControls
        quantity={2}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });
  });

  it('calls handleDeleteItem and closes modal on confirm', async () => {
    render(
      <CartItemControls
        quantity={1}
        name={mockName}
        handleQuantityChange={mockHandleQuantityChange}
        handleDeleteItem={mockHandleDeleteItem}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => {
      expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /confirm delete/i }));
    expect(mockHandleDeleteItem).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });
});
