import { fireEvent, render, screen } from '@testing-library/react';
import type { ProductCardProps } from '../../../types/index';
import ProductCard from '..';

jest.mock('@/shared/components/ui/DropDownMenu', () => {
  const MockDropDownMenu = () => <div data-testid='dropdown-menu' />;
  MockDropDownMenu.displayName = 'MockDropDownMenu';
  return MockDropDownMenu;
});

const mockOnAdd = jest.fn();
const mockOnRemove = jest.fn();

jest.mock('@/shared/components/ui/WishlistButton', () => {
  const MockWishlistButton = ({ onClick }: any) => (
    <button data-testid='wishlist-button' onClick={onClick}>
      Wishlist button
    </button>
  );
  MockWishlistButton.displayName = 'MockWishlistButton';
  return MockWishlistButton;
});

const mockCard: ProductCardProps['card'] = {
  id: 1,
  name: 'Nike Air Max 270',
  price: 160,
  gender: 'Women',
  img: { src: 'img1.png' },
};

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image, name, price, gender, and link', () => {
    render(<ProductCard card={mockCard} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'img1.png');
    expect(img).toHaveAttribute('alt', 'Nike Air Max 270');

    expect(screen.getByText('Nike Air Max 270')).toBeInTheDocument();
    expect(screen.getByText(/160/)).toBeInTheDocument();
    expect(screen.getByText("Women's Shoes")).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/product/1');
  });

  it('renders dropdown menu if variant is dropdown', () => {
    render(<ProductCard card={mockCard} variant='dropdown' />);
    expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
  });

  it('renders wishlist button if variant is addToWishlist', () => {
    render(<ProductCard card={mockCard} variant='addToWishlist' />);
    expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
  });

  it('calls addToWishlist when addToWishlist button is pressed', () => {
    render(
      <ProductCard
        card={mockCard}
        variant='addToWishlist'
        onClick={mockOnAdd}
      />,
    );
    fireEvent.click(screen.getByTestId('wishlist-button'));
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('renders wishlist button if variant is removeFromWishlist', () => {
    render(<ProductCard card={mockCard} variant='removeFromWishlist' />);
    expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
  });

  it('calls removeFromWishlist when removeFromWishlist button is pressed', () => {
    render(
      <ProductCard
        card={mockCard}
        variant='removeFromWishlist'
        onClick={mockOnRemove}
      />,
    );
    fireEvent.click(screen.getByTestId('wishlist-button'));
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
