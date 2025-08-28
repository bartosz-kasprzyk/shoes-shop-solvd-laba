import { render, screen } from '@testing-library/react';
import DiscountLine from '../DiscountLine';

describe('DiscountLine', () => {
  it('renders the promocode code and the calculated discount amount', () => {
    const mockPromocode = {
      code: 'savingMoney',
      text: '-20%',
      discoutInPercent: 0.2,
    };
    const mockSubtotal = 1000;

    render(<DiscountLine promocode={mockPromocode} subtotal={mockSubtotal} />);

    const expectedDiscountValue = mockSubtotal * mockPromocode.discoutInPercent;
    const formattedDiscount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(expectedDiscountValue);

    expect(screen.getByText(`${mockPromocode.code} -`)).toBeInTheDocument();
    expect(screen.getByText(formattedDiscount)).toBeInTheDocument();
  });

  it('handles different promocodes and subtotal values correctly', () => {
    const anotherPromocode = {
      code: 'theFamilyBusiness',
      text: '-30%',
      discoutInPercent: 0.3,
    };
    const anotherSubtotal = 50.5;

    render(
      <DiscountLine promocode={anotherPromocode} subtotal={anotherSubtotal} />,
    );

    const expectedDiscountValue =
      anotherSubtotal * anotherPromocode.discoutInPercent;

    const formattedDiscount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(expectedDiscountValue);

    expect(screen.getByText(`${anotherPromocode.code} -`)).toBeInTheDocument();
    expect(screen.getByText(formattedDiscount)).toBeInTheDocument();
  });
});
