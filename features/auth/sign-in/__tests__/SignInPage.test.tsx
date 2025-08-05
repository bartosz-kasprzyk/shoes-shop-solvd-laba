import { render, screen, fireEvent } from '@testing-library/react';
import SignInPage from '../SignInPage';
import '@testing-library/jest-dom';
import * as nextAuthReact from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

import { signIn } from 'next-auth/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignIn Page', () => {
  it('should show server error on incorrect credentials', async () => {
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

  it('should validate email format', async () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid@email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('should validate password length', async () => {
    render(<SignInPage />);
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(
      await screen.findByText(/password must be at least/i),
    ).toBeInTheDocument();
  });

  it('should render forgot and sign-up links', () => {
    render(<SignInPage />);
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should redirect - sign up link', () => {
    render(<SignInPage />);
    const link = screen.getByRole('link', { name: /sign up/i });
    expect(link).toHaveAttribute('href', '/sign-up');
  });
  it('should redirect - forgot passwor link', () => {
    render(<SignInPage />);
    const link = screen.getByRole('link', { name: /forgot password/i });
    expect(link).toHaveAttribute('href', '/forgot-password');
  });
});
