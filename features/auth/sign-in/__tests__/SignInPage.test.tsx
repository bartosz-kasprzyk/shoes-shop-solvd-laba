import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
  waitFor,
} from '@testing-library/react';
import SignInPage from '../SignInPage';
import '@testing-library/jest-dom';
import { signIn } from 'next-auth/react';
import { useSignIn } from '../useSignIn';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('SignIn Page', () => {
  const mockPush = jest.fn();
  const mockSearchParams = {
    get: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockSearchParams.get.mockReturnValue(null);
  });

  it('shows server error on incorrect credentials', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: 'Invalid credentials',
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@mail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'badpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Invalid email or password',
    );
  });

  it('shows server error on unverified email', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: 'Your account email is not confirmed',
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'correctButUnverified@mail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '12341234bestpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Please confirm your email before signing in.',
    );
  });

  it('validates email format', async () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('validates password length', async () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(
      await screen.findByText(/password must be at least/i),
    ).toBeInTheDocument();
  });

  it('renders forgot and sign-up links', () => {
    render(<SignInPage />);
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('redirects - sign up link', () => {
    render(<SignInPage />);
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toHaveAttribute('href', '/sign-up');
  });

  it('redirects - forgot password link', () => {
    render(<SignInPage />);
    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toHaveAttribute('href', '/forgot-password');
  });

  it('logs in - calls router.push with res.url when it is defined', async () => {
    const pushMock = jest.fn();
    const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>;
    const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

    mockedUseRouter.mockReturnValue({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    mockedSignIn.mockResolvedValue({
      error: null,
      url: '/custom-url',
      status: 200,
      ok: true,
    });

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signInUser({
        email: 'test@example.com',
        password: 'password123',
        remember: true,
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/custom-url');
  });

  it('successfully logs in - calls router.push with "/products" when res.url is undefined', async () => {
    const pushMock = jest.fn();
    const mockedSignIn = signIn as jest.MockedFunction<typeof signIn>;
    const mockedUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

    mockedUseRouter.mockReturnValue({
      push: pushMock,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    mockedSignIn.mockResolvedValue({
      error: null,
      url: null,
      status: 200,
      ok: true,
    });

    const { result } = renderHook(() => useSignIn());

    await act(async () => {
      await result.current.signInUser({
        email: 'test@example.com',
        password: 'password123',
        remember: true,
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/products');
  });

  it('calls signIn with remember: false when checkbox is unchecked', async () => {
    (signIn as jest.Mock).mockResolvedValue({
      error: null,
      url: '/products',
      status: 200,
      ok: true,
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    const rememberMeCheckbox = screen.getByLabelText(
      /remember me/i,
    ) as HTMLInputElement;
    if (rememberMeCheckbox.checked) {
      fireEvent.click(rememberMeCheckbox);
    }

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        identifier: 'test@example.com',
        password: 'password123',
        remember: false,
        callbackUrl: '/products',
      });
    });
    expect(mockPush).toHaveBeenCalledWith('/products');
  });

  it('calls signIn with remember: true when checkbox is checked', async () => {
    (signIn as jest.Mock).mockResolvedValue({
      error: null,
      url: '/products',
      status: 200,
      ok: true,
    });

    render(<SignInPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByLabelText(/remember me/i));
    expect(screen.getByLabelText(/remember me/i)).toBeChecked();

    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        identifier: 'test@example.com',
        password: 'password123',
        remember: true,
        callbackUrl: '/products',
      });
    });
    expect(mockPush).toHaveBeenCalledWith('/products');
  });
});
