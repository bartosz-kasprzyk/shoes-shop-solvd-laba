import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThankYouPage from '../page';

describe('ThankYouPage', () => {
  const testOrderNumber = '#12345678';
  const confirmationText =
    'Your order has been received and is currently being processed. You will receive an email confirmation with your order details shortly.';

  const renderPage = async (orderNumber?: string) => {
    const params = Promise.resolve({
      orderNumber: orderNumber ?? testOrderNumber,
    });
    render(await ThankYouPage({ params }));
  };

  describe('with a valid order number', () => {
    beforeEach(async () => {
      await renderPage();
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

    it('renders the action buttons', () => {
      expect(screen.getByText(/view order/i)).toBeInTheDocument();
      expect(screen.getByText(/continue shopping/i)).toBeInTheDocument();
    });

    it('renders the image with correct alt text', () => {
      expect(screen.getByAltText(/thank you image/i)).toBeInTheDocument();
    });
  });

  describe('with a missing order number', () => {
    it('displays the fallback value', async () => {
      await renderPage('');
      expect(screen.getByText(/missing order number/i)).toBeInTheDocument();
    });
  });
});
