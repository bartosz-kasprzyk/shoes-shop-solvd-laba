import { render, screen, fireEvent } from '@testing-library/react';
import SignUpPage from '../SignUpPage';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignUp Page', () => {
  it('should validate mismatched passwords', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'User' },
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

  it('should handle duplicate email registration', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({
        error: { message: 'email or username are already taken' },
      }),
    });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'User' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345678' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'duplicate@mail.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(
      await screen.findByText(/email or username are already taken/i),
    ).toBeInTheDocument();
  });

  it('should redirect to login after success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({ user: {}, jwt: 'token' }),
    });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'User' },
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
  it('should redirect - forgot sign in link', () => {
    render(<SignUpPage />);
    const link = screen.getByRole('link', { name: /log in/i });
    expect(link).toHaveAttribute('href', '/sign-in');
  });
});
