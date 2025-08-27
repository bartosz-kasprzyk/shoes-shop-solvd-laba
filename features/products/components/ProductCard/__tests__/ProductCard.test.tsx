import { fireEvent, render, screen } from '@testing-library/react';
import type { ProductCardProps } from '../../../types/index';
import ProductCard from '..';
import { useSession } from 'next-auth/react';
import type { WishlistButtonProps } from '@/shared/components/ui/WishlistButton/interface';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

(useSession as jest.Mock).mockReturnValue({
  data: { user: { accessToken: 'fake' } },
});

jest.mock('@/shared/components/ui/DropDownMenu', () => {
  const MockDropDownMenu = () => <div data-testid='dropdown-menu' />;
  return MockDropDownMenu;
});

const mockOnAdd = jest.fn();
const mockOnRemove = jest.fn();

jest.mock('@/shared/components/ui/WishlistButton', () => {
  const MockWishlistButton = ({ onClick }: WishlistButtonProps) => (
    <button data-testid='wishlist-button' onClick={onClick}>
      Wishlist button
    </button>
  );
  return MockWishlistButton;
});

const mockCard: ProductCardProps['card'] = {
  id: 1,
  name: 'Nike Air Max 270',
  price: 160,
  gender: 'Women',
  img: { src: 'http://example.com/test-image.png' },
};

describe('ProductCard', () => {
  it('renders image, name, price, gender, and link', () => {
    render(<ProductCard card={mockCard} />);

    const img = screen.getByRole('img');
    const decodedSrc = decodeURIComponent(img.getAttribute('src') || '');
    expect(decodedSrc).toContain('http://example.com/test-image.png');
    // expect(img).toHaveAttribute(
    //   'src',
    //   expect.stringContaining('http://example.com/test-image.png'),
    // );
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

  it('renders wishlist button if variant is toggleWishlist and user is authenticated', () => {
    render(
      <ProductCard
        card={mockCard}
        variant='toggleWishlist'
        onClick={mockOnAdd}
      />,
    );
    expect(screen.getByTestId('wishlist-button')).toBeInTheDocument();
  });

  it('calls addToWishlist when toggleWishlist with filled={false} button is pressed', () => {
    render(
      <ProductCard
        card={mockCard}
        variant='toggleWishlist'
        onClick={mockOnAdd}
        filled={false}
      />,
    );
    fireEvent.click(screen.getByTestId('wishlist-button'));
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('calls removeFromWishlist when toggleWishlist with filled={true} button is pressed', () => {
    render(
      <ProductCard
        card={mockCard}
        variant='toggleWishlist'
        onClick={mockOnRemove}
        filled={true}
      />,
    );
    fireEvent.click(screen.getByTestId('wishlist-button'));
    expect(mockOnRemove).toHaveBeenCalled();
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
