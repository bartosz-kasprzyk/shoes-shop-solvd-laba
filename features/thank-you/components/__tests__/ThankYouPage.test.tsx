import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThankYouPage } from '..';
import type { TestImageProps } from '@/shared/interfaces/Tests';

jest.mock('@/features/checkout/components/CartCleanerer', () => ({
  CartClearer: () => <div data-testid='cart-clearer' />,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _priority, ...rest }: TestImageProps) => (
    <img {...rest} alt={rest.alt || 'fallback'} />
  ),
}));

describe('ThankYouPage', () => {
  const confirmationText =
    'Your order has been received and is currently being processed. You will receive an email confirmation with your order details shortly.';

  it('renders the "THANK YOU" heading', () => {
    render(<ThankYouPage orderNumber='#12345678' />);
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });

  it('displays the correct order number', () => {
    render(<ThankYouPage orderNumber='98765432' />);
    expect(screen.getByText(/#98765432/)).toBeInTheDocument();
  });

  it('shows fallback when order number is missing', () => {
    render(<ThankYouPage />);
    expect(screen.getByText(/missing order number/i)).toBeInTheDocument();
  });

  it('renders the confirmation message', () => {
    render(<ThankYouPage orderNumber='#12345678' />);
    expect(screen.getByText(confirmationText)).toBeInTheDocument();
  });

  it('renders the action buttons', () => {
    render(<ThankYouPage orderNumber='#12345678' />);
    expect(screen.getByText(/view order/i)).toBeInTheDocument();
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
  });

  it('renders the CartClearer placeholder', () => {
    render(<ThankYouPage orderNumber='#12345678' />);
    expect(screen.getByTestId('cart-clearer')).toBeInTheDocument();
  });

  it('renders the image with correct alt text', () => {
    render(<ThankYouPage orderNumber='#12345678' />);
    expect(screen.getByAltText(/thank you image/i)).toBeInTheDocument();
  });
});
