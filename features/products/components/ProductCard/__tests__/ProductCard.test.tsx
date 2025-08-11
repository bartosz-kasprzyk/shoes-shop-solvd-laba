import { render, screen } from '@testing-library/react';
import type { ProductCardProps } from '../../../types/index';
import ProductCard from '..';

jest.mock('../../../../../shared/components/ui/DropDownMenu', () => {
  const MockDropDownMenu = () => <div data-testid='dropdown-menu' />;
  MockDropDownMenu.displayName = 'MockDropDownMenu';
  return MockDropDownMenu;
});

const mockCard: ProductCardProps['card'] = {
  id: 1,
  name: 'Nike Air Max 270',
  price: 160,
  gender: 'Women',
  img: { src: 'img1.png' },
};

describe('ProductCard', () => {
  it('renders image, name, price, gender, and link', () => {
    render(<ProductCard card={mockCard} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img1.png');
    expect(img).toHaveAttribute('alt', 'Nike Air Max 270');

    expect(screen.getByText('Nike Air Max 270')).toBeInTheDocument();
    expect(screen.getByText('160')).toBeInTheDocument();
    expect(screen.getByText("Women's Shoes")).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');

    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });
});
