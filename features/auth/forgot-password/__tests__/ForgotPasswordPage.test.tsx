import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordPage from '../ForgotPasswordPage';

describe('Forgot Password Page', () => {
  it('validates email format', async () => {
    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('shows error on server failure', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({ error: { message: 'User not found' } }),
    });

    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@mail.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/user not found/i)).toBeInTheDocument();
  });

  it('shows confirmation message on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@mail.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/email sent/i)).toBeInTheDocument();
  });

  it('shows an error message on network failure', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Mock error'));

    render(<ForgotPasswordPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/network error. please try again./i),
    ).toBeInTheDocument();
  });

  it('shows a generic error if the server error format is unexpected', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => ({}),
    });

    render(<ForgotPasswordPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(
      await screen.findByText(/something went wrong/i),
    ).toBeInTheDocument();
  });
});
