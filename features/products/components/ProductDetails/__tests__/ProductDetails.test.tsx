import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '..';
import { useProduct } from '../hooks/useProduct';

jest.mock('../hooks/useProduct', () => ({
  useProduct: jest.fn(),
}));

jest.mock('@/app/not-found', () => {
  const NotFound = () => <div>Error 404</div>;
  NotFound.displayName = 'NotFound';
  return NotFound;
});

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
    (useProduct as jest.Mock).mockReturnValue({
      data: productData,
      isLoading: false,
      isError: false,
    });
    window.alert = jest.fn();
  });

  it('renders product info', () => {
    render(<ProductDetails id='123' />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Some product description')).toBeInTheDocument();
  });

  it('shows alert when Add to Wishlist clicked', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('Add to Wishlist'));

    expect(window.alert).toHaveBeenCalledWith('Added to wishlist!');
  });

  it('shows warning if Add to Bag clicked without selecting size', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('Add to Bag'));

    expect(screen.getByText(/please choose your size/i)).toBeInTheDocument();
  });

  it('shows alert when Add to Bag clicked with size selected', () => {
    render(<ProductDetails id='123' />);

    fireEvent.click(screen.getByText('EU-38'));
    fireEvent.click(screen.getByText('Add to Bag'));

    expect(window.alert).toHaveBeenCalledWith('Product added to the bag!');
  });

  it('renders NotFound if no product data', () => {
    (useProduct as jest.Mock).mockReturnValue({ data: null });

    render(<ProductDetails id='123' />);

    expect(screen.getByText(/error 404/i)).toBeInTheDocument();
  });

  it('renders color name if color data is present', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: productData,
    });

    render(<ProductDetails id='123' />);
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('renders empty color if no color data', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: {
        data: {
          attributes: {
            ...productData.data.attributes,
            color: { data: null },
          },
        },
      },
    });

    render(<ProductDetails id='123' />);

    const colorElement = screen.getByText('', { selector: 'p' });

    expect(colorElement).toBeInTheDocument();
  });

  it('handles empty sizes data gracefully', () => {
    (useProduct as jest.Mock).mockReturnValue({
      data: {
        data: {
          attributes: {
            ...productData.data.attributes,
            sizes: { data: null },
          },
        },
      },
    });

    render(<ProductDetails id='123' />);

    const sizeButtons = screen.getAllByText(/EU-/i);
    sizeButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
