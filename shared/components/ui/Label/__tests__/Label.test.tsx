import { render, screen } from '@testing-library/react';
import Label from '..';

describe('Label component', () => {
  it('renders the label with text', () => {
    render(<Label id='email'>Email Address</Label>);
    expect(screen.getByText(/email address/i)).toBeInTheDocument();
  });

  it('sets the correct htmlFor attribute', () => {
    render(<Label id='username'>Username</Label>);
    const label = screen.getByText('Username');
    expect(label.closest('label')).toHaveAttribute('for', 'username');
  });

  it('renders the required indicator element when "required" prop is true', () => {
    render(
      <Label id='password' required>
        Password
      </Label>,
    );
    expect(screen.getByTestId('label-required')).toBeInTheDocument();
  });

  it('does not render the required indicator element when "required" prop is false', () => {
    render(<Label id='name'>Name</Label>);
    const requiredLabel = screen.queryByTestId('label-required');
    expect(requiredLabel).not.toBeInTheDocument();
  });
});
