import { render, screen, fireEvent } from '@testing-library/react';
import { ResetPasswordForm } from '../ResetPasswordForm';

describe('Forgot password form', () => {
  it('shows "Reset password" when status is not loading', () => {
    render(
      <ResetPasswordForm onSubmit={jest.fn()} status='idle' serverError='' />,
    );

    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('shows "Sending..." when status is loading', () => {
    render(
      <ResetPasswordForm
        onSubmit={jest.fn()}
        status='loading'
        serverError=''
      />,
    );

    expect(
      screen.getByRole('button', { name: /resetting.../i }),
    ).toBeInTheDocument();
  });
});
