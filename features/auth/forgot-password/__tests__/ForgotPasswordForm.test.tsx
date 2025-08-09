import { render, screen, fireEvent } from '@testing-library/react';
import { ForgotPasswordForm } from '../ForgotPasswordForm';

describe('Forgot password form', () => {
  it('shows "Reset password" when status is not loading', () => {
    render(
      <ForgotPasswordForm onSubmit={jest.fn()} status='idle' serverError='' />,
    );

    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('shows "Sending..." when status is loading', () => {
    render(
      <ForgotPasswordForm
        onSubmit={jest.fn()}
        status='loading'
        serverError=''
      />,
    );

    expect(
      screen.getByRole('button', { name: /sending/i }),
    ).toBeInTheDocument();
  });
});
