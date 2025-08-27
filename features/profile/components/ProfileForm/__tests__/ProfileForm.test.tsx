import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileForm from '..';
import useProfile from '../../../hooks/useProfile';
import { useSession } from 'next-auth/react';

jest.mock('../../../hooks/useProfile');
jest.mock('next-auth/react');

const mockUpdate = jest.fn();

jest.mock('@/shared/hooks/useServerSession', () => ({
  useServerSession: jest.fn(() => ({
    user: { name: 'John Doe', email: 'john@example.com', image: null },
  })),
}));

(useSession as jest.Mock).mockReturnValue({
  data: {
    user: {
      id: 1,
      accessToken: 'token',
      name: 'John Doe',
      email: 'john@example.com',
      image: null,
    },
  },
  status: 'authenticated',
  update: mockUpdate,
});

const mockOnSubmit = jest.fn();

const mockProfile = {
  data: {
    firstName: 'user',
    lastName: 'test',
    email: 'john@example.com',
    phoneNumber: '123456789',
    avatar: { url: 'https://example.com/avatar.png', id: 1 },
  },
  isLoading: false,
};

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => 'http://localhost/mock-url');
});

beforeEach(() => {
  (useProfile as jest.Mock).mockReturnValue({
    profile: mockProfile,
    onSubmit: mockOnSubmit,
    isSubmitting: false,
    isLoadingSession: false,
    isAuthenticated: true,
  });
});

describe('ProfileForm', () => {
  it('renders the form and submits data', async () => {
    render(<ProfileForm />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('user')).toBeInTheDocument();
    });

    const firstNameInput = screen.getByLabelText(/Name/);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'name');

    const lastNameInput = screen.getByLabelText(/surname/i);
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, 'surname');

    const phoneInput = screen.getByLabelText(/phone number/i);
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '987654321');

    const file = new File(['avatar'], 'john.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        profile: {
          firstName: 'name',
          lastName: 'surname',
          email: 'john@example.com',
          phoneNumber: '987654321',
          avatar: { url: 'https://example.com/avatar.png', id: 1 },
        },
        avatarOperation: 'update',
        avatarFile: file,
      });
    });
  });

  it('handles avatar deletion', async () => {
    render(<ProfileForm />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('user')).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    const firstNameInput = screen.getByLabelText(/Name/);
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'name');

    const lastNameInput = screen.getByLabelText(/surname/i);
    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, 'surname');

    const phoneInput = screen.getByLabelText(/phone number/i);
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, '987654321');

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        profile: {
          firstName: 'name',
          lastName: 'surname',
          email: 'john@example.com',
          phoneNumber: '987654321',
          avatar: null,
        },
        avatarOperation: 'delete',
        avatarFile: undefined,
      });
    });
  });

  it('shows loading state when profile is loading', () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { isLoading: true },
      isSubmitting: false,
      isLoadingSession: false,
      isAuthenticated: true,
      onSubmit: jest.fn(),
    });

    render(<ProfileForm />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('disables the submit button when submitting', () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        data: {
          firstName: 'user',
          lastName: 'test',
          email: 'john@example.com',
          phoneNumber: '123456789',
          avatar: { url: 'https://example.com/avatar.png', id: 1 },
        },
        isLoading: false,
      },
      onSubmit: jest.fn(),
      isSubmitting: true,
      isLoadingSession: false,
      isAuthenticated: true,
    });

    render(<ProfileForm />);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();

    const submitText = screen.queryByText(/submit/i);
    expect(submitText).not.toBeInTheDocument();
  });
});
