import { render, screen, fireEvent } from '@testing-library/react';
import ForgotPasswordPage from '../ForgotPasswordPage';

describe('Forgot Password Page', () => {
  it('should validate email format', async () => {
    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it('should show error on server failure', async () => {
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

  it('should show confirmation message on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: () => ({}) });

    render(<ForgotPasswordPage />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@mail.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText(/email sent/i)).toBeInTheDocument();
  });
});
