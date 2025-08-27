import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteConfirmationModal from '..';

jest.mock('@/shared/icons/CloseIcon', () => ({
  __esModule: true,
  default: () => (
    <svg data-testid='close-icon' aria-label='Close modal button' />
  ),
}));

jest.mock('@/shared/components/ui/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, variant, ...props }: any) => (
    <button onClick={onClick} {...props} data-variant={variant}>
      {children}
    </button>
  ),
}));

describe('DeleteConfirmationModal', () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();
  const defaultHeader = 'Are you sure you want to delete this item?';
  const defaultText =
    'This action cannot be undone. Please confirm your decision.';

  const renderComponent = (isOpen: boolean = true) => {
    return render(
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onDelete={mockOnDelete}
        header={defaultHeader}
        text={defaultText}
      />,
    );
  };

  it('does not render the modal when isOpen is false', () => {
    renderComponent(false);

    expect(screen.queryByText(defaultHeader)).not.toBeInTheDocument();
  });

  it('renders the modal when isOpen is true', () => {
    renderComponent(true);

    expect(screen.getByText(defaultHeader)).toBeInTheDocument();
    expect(screen.getByText(defaultText)).toBeInTheDocument();
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('calls onClose when the top-right CloseIcon button is clicked', () => {
    renderComponent();
    const closeIconButton = screen.getByRole('button', {
      name: /close modal button/i,
    });
    fireEvent.click(closeIconButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('calls onClose when the "Cancel" button is clicked', () => {
    renderComponent();
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('calls onDelete when the "Delete" button is clicked', () => {
    renderComponent();
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
