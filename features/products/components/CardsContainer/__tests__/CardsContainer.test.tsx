import { render, screen } from '@testing-library/react';

import type { Card } from '../../ProductCard/interface';
import CardsContainer from '..';

jest.mock('../../ProductCard', () => {
  const MockProductCard = ({ card }: any) => (
    <div data-testid='product-card'>{card.name}</div>
  );
  MockProductCard.displayName = 'MockProductCard';
  return MockProductCard;
});

const mockCards: Card[] = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    img: { src: 'img1.png' },
    price: 550,
    gender: 'Men',
  },
  {
    id: 2,
    name: 'Nike Air Max 90',
    img: { src: 'img1.png' },
    price: 499,
    gender: 'Women',
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07 SE",
    img: { src: 'img1.png' },
    price: 520,
    gender: 'Men',
  },
  {
    id: 4,
    name: 'Nike Air Zoom Pegasus',
    img: { src: 'img1.png' },
    price: 600,
    gender: 'Women',
  },
];

describe('CardsContainer', () => {
  it('renders all cards from the actual data file', () => {
    render(<CardsContainer cards={mockCards} />);

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(4);

    expect(screen.getByText('Nike Air Max 270')).toBeInTheDocument();
    expect(screen.getByText('Nike Air Max 90')).toBeInTheDocument();
    expect(screen.getByText("Nike Air Force 1 '07 SE")).toBeInTheDocument();
    expect(screen.getByText('Nike Air Zoom Pegasus')).toBeInTheDocument();
  });
});
