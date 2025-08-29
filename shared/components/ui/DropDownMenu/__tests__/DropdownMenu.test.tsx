import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import DropDownMenu from '..';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  DeleteModalProps,
  EditModalProps,
} from '@/features/products/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/hooks/useUser', () => ({
  __esModule: true,
  default: () => ({ session: { user: { id: 1, accessToken: 'token' } } }),
}));

jest.mock('@/features/products/components/DeleteConfirmationModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onDelete, header, text }: DeleteModalProps) =>
    isOpen ? (
      <div data-testid='delete-modal'>
        <p>{header}</p>
        <p>{text}</p>
        <button onClick={onDelete}>Delete Confirm</button>
        <button onClick={onClose}>Delete Close</button>
      </div>
    ) : null,
}));

jest.mock('@/features/products/components/EditProductContent', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, productId }: EditModalProps) =>
    isOpen ? (
      <div data-testid='edit-modal'>
        <p>Edit Product {productId}</p>
        <button onClick={onClose}>Edit Close</button>
      </div>
    ) : null,
}));

jest.mock('@/app/api/products', () => ({
  deleteProduct: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

jest.mock('@/shared/actions/revalidateProductPaths', () => ({
  revalidateProductPaths: jest.fn(),
}));

describe('DropDownMenu', () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  const queryClient = new QueryClient();

  const mockUseMutation = useMutation as jest.Mock;
  const mockUseQueryClient = useQueryClient as jest.Mock;
  const mockInvalidateQueries = jest.fn();

  let mockMutate = jest.fn();

  beforeEach(() => {
    mockMutate = jest.fn();

    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      isSuccess: false,
    });

    mockUseQueryClient.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
  });

  const renderComponent = (id: number = 1) =>
    render(
      <QueryClientProvider client={queryClient}>
        <DropDownMenu id={id} />
      </QueryClientProvider>,
    );

  it('renders icon button', () => {
    renderComponent();
    expect(
      screen.getByRole('button', { name: /more icon/i }),
    ).toBeInTheDocument();
  });

  it('opens menu on icon button click', () => {
    renderComponent();
    const iconButton = screen.getByRole('button', { name: /more icon/i });
    fireEvent.click(iconButton);

    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('navigates when View is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    fireEvent.click(screen.getByText('View'));
    expect(push).toHaveBeenCalledWith('/product/1');
  });

  it('navigates when Edit is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    fireEvent.click(screen.getByText('Edit'));
    expect(push).toHaveBeenCalledWith('/my-products/edit-product/1');
  });

  it('calls deleteProduct mutation and invalidates queries on successful delete', async () => {
    mockUseMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: undefined,
    });

    renderComponent(1);
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    fireEvent.click(screen.getByText('Delete'));

    const deleteConfirmButton = screen.getByRole('button', {
      name: /delete confirm/i,
    });
    fireEvent.click(deleteConfirmButton);

    expect(mockMutate).toHaveBeenCalledWith(1);

    act(() => {
      mockUseMutation.mock.calls[0][0].onSuccess();
    });

    await waitFor(() => {
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        predicate: expect.any(Function),
      });

      const predicateFn = mockInvalidateQueries.mock.calls[0][0].predicate;
      expect(predicateFn({ queryKey: ['myProducts', 1] })).toBe(true);
      expect(predicateFn({ queryKey: ['myProducts', 2] })).toBe(false);
      expect(predicateFn({ queryKey: ['someOtherQuery'] })).toBe(false);

      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });

  it('closes DeleteConfirmationModal when "Delete Close" is clicked', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

    const deleteCloseButton = screen.getByRole('button', {
      name: /delete close/i,
    });
    fireEvent.click(deleteCloseButton);

    await waitFor(() => {
      expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
    });
  });

  it('closes the menu when handleClose is called', () => {
    renderComponent();

    const iconButton = screen.getByRole('button', { name: /more icon/i });
    fireEvent.click(iconButton);

    expect(screen.getByText('View')).toBeInTheDocument();

    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'Escape', code: 'Escape' });

    waitFor(() => {
      expect(screen.queryByText('View')).not.toBeInTheDocument();
    });
  });
});
