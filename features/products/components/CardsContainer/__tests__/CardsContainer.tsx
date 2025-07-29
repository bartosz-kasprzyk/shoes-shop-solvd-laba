import { render, screen } from '@testing-library/react';
import CardsContainer from '..';

jest.mock('../../ProductCard', () => {
  const MockProductCard = ({ card }: any) => (
    <div data-testid='product-card'>{card.name}</div>
  );
  MockProductCard.displayName = 'MockProductCard';
  return MockProductCard;
});

describe('CardsContainer', () => {
  it('renders all cards from the actual data file', () => {
    render(<CardsContainer />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(4);

    expect(screen.getByText('Nike Air Max 270')).toBeInTheDocument();
    expect(screen.getByText('Nike Air Max 90')).toBeInTheDocument();
    expect(screen.getByText("Nike Air Force 1 '07 SE")).toBeInTheDocument();
    expect(screen.getByText('Nike Air Zoom Pegasus')).toBeInTheDocument();
  });
});
