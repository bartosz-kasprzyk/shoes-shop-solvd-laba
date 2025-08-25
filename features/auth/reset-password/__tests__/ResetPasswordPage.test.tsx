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

  it('validates password match', async () => {
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

  it('shows success message and redirect', async () => {
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

  it('validates short passwords', async () => {
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

  it('shows an error message on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Mock error'));

    render(<ResetPasswordPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '123456123456' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '123456123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });

  it('shows error message on bad response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          error: {
            message:
              'The reset password link is invalid or has expired. Please try again.',
          },
        }),
    });

    render(<ResetPasswordPage />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: '12345678' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(
        /the reset password link is invalid or has expired. please try again./i,
      ),
    ).toBeInTheDocument();
  });
});
