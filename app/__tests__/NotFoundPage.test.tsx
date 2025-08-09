import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from '@/app/not-found';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NotFound page', () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  it('renders 404 message and description', () => {
    render(<NotFound />);

    expect(screen.getByText(/error 404/i)).toBeInTheDocument();
    expect(screen.getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });

  it('renders Go back and Home buttons', () => {
    render(<NotFound />);

    expect(screen.getAllByRole('button', { name: /go back/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /home/i })).toHaveLength(2);
  });

  it('calls router.back() when Go back button is clicked', () => {
    render(<NotFound />);

    const goBackButtons = screen.getAllByRole('button', { name: /go back/i });

    goBackButtons.forEach((btn) => fireEvent.click(btn));

    expect(mockBack).toHaveBeenCalledTimes(goBackButtons.length);
  });

  it('has Home button linking to "/"', () => {
    render(<NotFound />);

    const homeLinks = screen.getAllByRole('link', { name: /home/i });

    homeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/');
    });
  });
});
