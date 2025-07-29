import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThankYouPage from '../page';

describe('Thank you page', () => {
  const testOrderNumber = '#12345678';

  const confirmationText =
    'Your order has been received and is currently being processed. You will receive an email confirmation with your order details shortly.';

  beforeEach(() => {
    render(<ThankYouPage orderNumber={testOrderNumber} />);
  });

  it('renders the "THANK YOU" heading', () => {
    expect(screen.getByText(/thank you/i)).toBeInTheDocument();
  });

  it('displays the correct order number', () => {
    expect(screen.getByText(testOrderNumber)).toBeInTheDocument();
  });

  it('renders the confirmation message', () => {
    expect(screen.getByText(confirmationText)).toBeInTheDocument();
  });

  it('renders the actions buttons', () => {
    expect(screen.getByText(/view order/i)).toBeInTheDocument();
    expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
  });

  it('renders the image with correct alt text', () => {
    expect(screen.getByAltText(/thank you image/i)).toBeInTheDocument();
  });
});
