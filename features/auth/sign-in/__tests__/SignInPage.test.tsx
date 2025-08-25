import {
  render,
  screen,
  fireEvent,
  act,
  renderHook,
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
});
