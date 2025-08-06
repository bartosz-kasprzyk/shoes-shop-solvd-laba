import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '..';
import { useProduct } from '../hooks/useProduct';

jest.mock('../hooks/useProduct', () => ({
  useProduct: jest.fn(),
}));

const productData = {
  data: {
    attributes: {
      name: 'Nike Air',
      price: 149,
      images: { data: [{ attributes: { url: '/image1.jpg' } }] },
      sizes: {
        data: [{ attributes: { value: 38 } }, { attributes: { value: 40 } }],
      },
      color: { data: { attributes: { name: 'White' } } },
      description: 'Some product description',
    },
  },
};

describe('ProductDetails', () => {
  beforeEach(() => {
    window.alert = jest.fn();
  });

  test('renders product info', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: productData,
      isLoading: false,
      isError: false,
    });

    render(<ProductDetails id='123' />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Some product description')).toBeInTheDocument();
  });

  test('shows alert when Add to Wishlist clicked', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('Add to Wishlist'));

    expect(window.alert).toHaveBeenCalledWith('Added to wishlist!');
  });

  test('shows warning if Add to Bag clicked without selecting size', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('Add to Bag'));

    expect(screen.getByText(/please choose your size/i)).toBeInTheDocument();
  });

  test('shows alert when Add to Bag clicked with size selected', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('EU-38'));
    fireEvent.click(screen.getByText('Add to Bag'));

    expect(window.alert).toHaveBeenCalledWith('Product added to the bag!');
  });
});
