import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '..';

describe('Input component', () => {
  it('renders label and input', () => {
    render(<Input id='test-input' title='Test Title' />);
    expect(screen.getByLabelText(/Test Title/i)).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input id='required-input' title='Required Field' required />);
    const label = screen.getByText(/Required Field/i);
    expect(label).toBeInTheDocument();
  });

  it('displays error and helper text', () => {
    render(
      <Input
        id='error-input'
        title='Error Field'
        error
        helperText='This is an error'
      />,
    );
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies auto height when multiline is true', () => {
    const { container } = render(
      <Input id='test-input' title='Test Input' multiline />,
    );

    const inputWrapper = container.querySelector('.MuiOutlinedInput-root');
    expect(inputWrapper).toHaveStyle('height: auto');
  });

  it('displays current length and max length when value and maxLength are provided', () => {
    const testValue = 'hello';
    const maxLength = 100;
    render(
      <Input
        id='length-input'
        title='Length Field'
        value={testValue}
        maxLength={maxLength}
      />,
    );

    expect(
      screen.getByText(`${testValue.length}/${maxLength}`),
    ).toBeInTheDocument();
  });
});
