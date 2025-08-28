import { render, screen, fireEvent } from '@testing-library/react';
import PromocodeItem from '../PromocodeItem';
import type { promocode } from '../interface';

describe('PromocodeItem', () => {
  const promo: promocode = {
    code: 'DISCOUNT10',
    text: '10% off your order',
    discoutInPercent: 10,
  };

  const onRemove = jest.fn();

  it('renders the promocode code and text', () => {
    render(<PromocodeItem promocode={promo} onRemove={onRemove} />);

    expect(screen.getByText('DISCOUNT10')).toBeInTheDocument();
    expect(screen.getByText('10% off your order')).toBeInTheDocument();
  });

  it('calls onRemove with the code when remove button is clicked', () => {
    render(<PromocodeItem promocode={promo} onRemove={onRemove} />);

    const button = screen.getByText(/remove/i);
    fireEvent.click(button);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith('DISCOUNT10');
  });
});
