import { render, screen } from '@testing-library/react';
import { ResetPasswordForm } from '../ResetPasswordForm';
import { useResetPassword } from '../useResetPassword';

jest.mock('../useResetPassword');

describe('ResetPasswordForm', () => {
  const mockResetPassword = jest.fn();

  it('shows "Reset password" when status is idle', () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      status: 'idle',
      serverError: '',
    });

    render(<ResetPasswordForm />);

    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('shows "Resetting..." when status is loading', () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      status: 'loading',
      serverError: '',
    });

    render(<ResetPasswordForm />);

    expect(
      screen.getByRole('button', { name: /resetting.../i }),
    ).toBeInTheDocument();
  });

  it('shows success message when status is success', () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      status: 'success',
      serverError: '',
    });

    render(<ResetPasswordForm />);

    expect(
      screen.getByText(/password reset! redirecting/i),
    ).toBeInTheDocument();
  });

  it('shows server error when present', () => {
    (useResetPassword as jest.Mock).mockReturnValue({
      resetPassword: mockResetPassword,
      status: 'idle',
      serverError: 'Something went wrong',
    });

    render(<ResetPasswordForm />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
