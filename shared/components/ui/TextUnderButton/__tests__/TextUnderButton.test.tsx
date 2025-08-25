import { render, screen } from '@testing-library/react';
import TextUnderButton from '..';

describe('TextUnderButton', () => {
  it('renders with both text and linkText', () => {
    render(<TextUnderButton text='text' linkText='link' href='/login' />);
    expect(screen.getByText('text')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'link' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('renders only linkText when text is not provided', () => {
    render(<TextUnderButton linkText='Login' href='/login' />);

    const link = screen.getByRole('link', { name: /login/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');

    expect(
      screen.queryByText(/Don't have an account/i),
    ).not.toBeInTheDocument();
  });
});
