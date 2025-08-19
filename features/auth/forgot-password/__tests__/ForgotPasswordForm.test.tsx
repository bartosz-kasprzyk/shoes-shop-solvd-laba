import { render, screen } from '@testing-library/react';
import { ForgotPasswordForm } from '../ForgotPasswordForm';
import { useForgotPassword } from '../useForgotPassword';

jest.mock('../useForgotPassword');

describe('ForgotPasswordForm', () => {
  const mockRequestReset = jest.fn();

  it('shows "Reset password" when status is idle', () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      requestReset: mockRequestReset,
      status: 'idle',
      serverError: '',
    });

    render(<ForgotPasswordForm />);

    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('shows "Sending..." when status is loading', () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      requestReset: mockRequestReset,
      status: 'loading',
      serverError: '',
    });

    render(<ForgotPasswordForm />);

    expect(
      screen.getByRole('button', { name: /sending.../i }),
    ).toBeInTheDocument();
  });

  it('shows success message when status is sent', () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      requestReset: mockRequestReset,
      status: 'sent',
      serverError: '',
    });

    render(<ForgotPasswordForm />);

    expect(
      screen.getByText(/email sent. check your inbox!/i),
    ).toBeInTheDocument();
  });

  it('shows server error when present', () => {
    (useForgotPassword as jest.Mock).mockReturnValue({
      requestReset: mockRequestReset,
      status: 'idle',
      serverError: 'Something went wrong',
    });

    render(<ForgotPasswordForm />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
