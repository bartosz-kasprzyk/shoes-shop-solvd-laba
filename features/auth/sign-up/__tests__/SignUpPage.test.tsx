import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from '@testing-library/react';
import SignUpPage from '../SignUpPage';
import { useSignUp } from '../useSignUp';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Page', () => {
  it('validates mismatched passwords', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@mail.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it('handles duplicate email registration', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({
        error: { message: 'email or username are already taken' },
      }),
    });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Qwerty12@' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Qwerty12@' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'duplicate@mail.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/email or username are already taken/i),
    ).toBeInTheDocument();
  });

  it('redirects to login after success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ user: {}, jwt: 'token' }),
    });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@mail.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345678' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByText(/success/i)).toBeInTheDocument();
  });

  it('redirects - forgot sign in link', () => {
    render(<SignUpPage />);
    const link = screen.getByRole('link', { name: /log in/i });
    expect(link).toHaveAttribute('href', '/sign-in');
  });

  it('sets fallback serverError message when API error message is missing', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({}),
    });

    const { result } = renderHook(() => useSignUp());

    await act(async () => {
      await result.current.registerUser({
        name: 'John Doe',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });

    expect(result.current.serverError).toBe('Registration failed');
  });

  it('shows validation error for invalid name', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Ed' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/name must be at least 3 characters/i),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid password and password confirmation', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '1234' },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/password must be at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid password and password confirmation', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '1234' },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/password must be at least 8 characters/i),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid password and password confirmation (weak password policy)', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'qwerty123' },
    });

    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'qwerty123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(
        /password must include uppercase, lowercase, number, and special character/i,
      ),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid email format', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('shows validation error when name does not contain a "full" name', async () => {
    render(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/enter your full name/i),
    ).toBeInTheDocument();
  });
});
