import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartSummary from '..';

import { validPromocodes } from '../../PromocodesSection/consts';
import { useCartDetails } from '../../CartDetailsContext';
import { useCart } from '@/shared/hooks/useCart';
import type { PromocodeSectionProps } from '../../PromocodesSection/interface';

jest.mock('../../CartDetailsContext');
jest.mock('@/shared/hooks/useCart');

jest.mock('../../PromocodesSection', () => {
  return jest.fn(
    ({ setPromocodes, handleDeletePromocode }: PromocodeSectionProps) => (
      <div data-testid='promocode-section-mock'>
        <button
          onClick={() => setPromocodes([validPromocodes[0]])}
          data-testid='apply-promo'
        >
          Apply Promo
        </button>
        <button
          onClick={() => handleDeletePromocode('savingMoney')}
          data-testid='delete-promo'
        >
          Delete Promo
        </button>
      </div>
    ),
  );
});

jest.mock('../SummaryLine', () => {
  return jest.fn(({ label, value }) => (
    <div
      data-testid={`summary-line-${label.toLowerCase()}`}
    >{`${label}: $${value}`}</div>
  ));
});

jest.mock('../DiscountLine', () => {
  return jest.fn(({ promocode, subtotal }) => (
    <div data-testid={`discount-line-${promocode.code}`}>
      {`Discount: ${promocode.code} - $${(promocode.discoutInPercent * subtotal).toFixed(2)}`}
    </div>
  ));
});

jest.mock('../TotalSection', () => {
  return jest.fn(({ total }) => (
    <div data-testid='total-section'>Total: ${total}</div>
  ));
});

describe('CartSummary', () => {
  const mockSetTotal = jest.fn();
  const mockCartItems = [
    { id: '1', name: 'Item 1', price: 100, quantity: 2 },
    { id: '2', name: 'Item 2', price: 50, quantity: 1 },
  ];

  beforeEach(() => {
    (useCartDetails as jest.Mock).mockReturnValue({
      cartItems: mockCartItems,
    });
    (useCart as jest.Mock).mockReturnValue({
      setTotal: mockSetTotal,
    });
  });

  it('renders correct totals without any promocodes', () => {
    render(<CartSummary />);

    const expectedSubtotal = 100 * 2 + 50 * 1;
    const expectedShipping = 20;
    const expectedTax = (expectedSubtotal + expectedShipping) * 0.23;
    const expectedTotal = expectedSubtotal + expectedShipping + expectedTax;

    expect(screen.getByTestId('summary-line-subtotal')).toHaveTextContent(
      `Subtotal: $${expectedSubtotal.toFixed(2)}`,
    );
    expect(screen.getByTestId('summary-line-shipping')).toHaveTextContent(
      `Shipping: $${expectedShipping.toFixed(2)}`,
    );
    expect(screen.getByTestId('summary-line-tax')).toHaveTextContent(
      `Tax: $${expectedTax.toFixed(2)}`,
    );
    expect(screen.getByTestId('total-section')).toHaveTextContent(
      `Total: $${expectedTotal.toFixed(2)}`,
    );
    expect(mockSetTotal).toHaveBeenCalledWith(expectedTotal);
  });

  it('applies a promocode and recalculates totals', async () => {
    render(<CartSummary />);

    fireEvent.click(screen.getByTestId('apply-promo'));

    await waitFor(() => {
      expect(
        screen.getByTestId('discount-line-savingMoney'),
      ).toBeInTheDocument();
    });

    const expectedSubtotal = 250;
    const expectedShipping = 20;
    const expectedTax = (expectedSubtotal + expectedShipping) * 0.23;
    const totalBeforeDiscount =
      expectedSubtotal + expectedShipping + expectedTax;
    const discount = totalBeforeDiscount * validPromocodes[0].discoutInPercent;
    const expectedTotal = totalBeforeDiscount - discount;

    expect(screen.getByTestId('discount-line-savingMoney')).toHaveTextContent(
      `Discount: savingMoney - $${discount.toFixed(2)}`,
    );
    expect(screen.getByTestId('total-section')).toHaveTextContent(
      `Total: $${expectedTotal.toFixed(2)}`,
    );
    expect(mockSetTotal).toHaveBeenCalledWith(expectedTotal);
  });

  it('deletes a promocode and updates the total', async () => {
    render(<CartSummary />);

    fireEvent.click(screen.getByTestId('apply-promo'));

    await waitFor(() => {
      expect(
        screen.getByTestId('discount-line-savingMoney'),
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('delete-promo'));

    await waitFor(() => {
      expect(
        screen.queryByTestId('discount-line-savingMoney'),
      ).not.toBeInTheDocument();
    });

    const expectedSubtotal = 250;
    const expectedShipping = 20;
    const expectedTax = (expectedSubtotal + expectedShipping) * 0.23;
    const expectedTotal = expectedSubtotal + expectedShipping + expectedTax;

    expect(screen.getByTestId('total-section')).toHaveTextContent(
      `Total: $${expectedTotal.toFixed(2)}`,
    );
    expect(mockSetTotal).toHaveBeenCalledWith(expectedTotal);
  });
});
