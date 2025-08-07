import { render, screen, fireEvent } from '@testing-library/react';
import ResetPasswordPage from '../ResetPasswordPage';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));

describe('Reset Password Page', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => 'dummy-code',
    });
  });

  it('should validate password match', async () => {
    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it('should show error on invalid link', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ error: { message: 'Invalid code' } }),
    });

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/invalid code/i)).toBeInTheDocument();
  });

  it('should show success message and redirect', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({}),
    });

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/password reset/i)).toBeInTheDocument();
  });

  it('password too short', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => ({}),
    });

    render(<ResetPasswordPage />);
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    const errors = await screen.findAllByText(/at least 8 characters/i);
    expect(errors).toHaveLength(2);
  });
});
