import { render, screen, fireEvent } from '@testing-library/react';
import DropDownMenu from '..';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/shared/hooks/useUser', () => ({
  __esModule: true,
  default: () => ({ session: { user: { id: 1, accessToken: 'token' } } }),
}));

jest.mock('@/features/products/components/DeleteConfirmationModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, onDelete }: any) =>
    isOpen ? (
      <div data-testid='delete-modal'>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe('DropDownMenu', () => {
  const push = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push });

  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <DropDownMenu id={1} />
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

  // it('logs action for Edit and Duplicate', () => {
  //   renderComponent();
  //   fireEvent.click(screen.getByRole('button', { name: /more icon/i }));

  //   fireEvent.click(screen.getByText('Edit'));
  //   expect(console.log).toHaveBeenCalledWith('Edit clicked');

  //   fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
  //   fireEvent.click(screen.getByText('Duplicate'));
  //   expect(console.log).toHaveBeenCalledWith('Duplicate clicked');
  // });

  it('opens DeleteConfirmationModal when Delete is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button', { name: /more icon/i }));
    fireEvent.click(screen.getByText('Delete'));

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });
});
