import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '..';

const showSnackbarMock = jest.fn();

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

jest.mock('@/app/not-found', () => {
  const NotFound = () => <div>Error 404</div>;
  NotFound.displayName = 'NotFound';
  return NotFound;
});

const productData = {
  data: {
    id: 123,
    attributes: {
      name: 'Nike Air',
      price: 149,
      images: { data: [{ id: 1, attributes: { url: '/image1.jpg' } }] },
      sizes: {
        data: [
          { id: 10, attributes: { value: 38 } },
          { id: 11, attributes: { value: 40 } },
        ],
      },
      color: { data: { attributes: { name: 'White' } } },
      description: 'Some product description',
      brand: 'Nike',
      gender: { data: { id: 1, attributes: { name: 'Men' as const } } },
    },
  },
};

describe('ProductDetails', () => {
  beforeEach(() => {
    showSnackbarMock.mockClear();
    window.alert = jest.fn();
  });

  it('renders product info', () => {
    render(<ProductDetails initialData={productData} />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText('$149')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Some product description')).toBeInTheDocument();
  });

  it('shows snackbar alert when Add to Wishlist clicked', () => {
    render(<ProductDetails initialData={productData} />);

    fireEvent.click(screen.getByText('Add to Wishlist'));

    expect(showSnackbarMock).toHaveBeenCalledWith(
      'Product added to wishlist',
      'success',
      5000,
    );
  });

  it('shows warning if Add to Bag clicked without selecting size', () => {
    render(<ProductDetails initialData={productData} />);

    fireEvent.click(screen.getByText('Add to Bag'));

    expect(screen.getByText(/please choose your size/i)).toBeInTheDocument();
  });

  it('shows alert when Add to Bag clicked with size selected', () => {
    render(<ProductDetails initialData={productData} />);

    fireEvent.click(screen.getByText('EU-38'));
    fireEvent.click(screen.getByText('Add to Bag'));

    expect(window.alert).toHaveBeenCalledWith('Product added to the bag!');
  });

  // it('renders NotFound if no product data', () => {
  //   render(<ProductDetails initialData={null} />);

  //   expect(screen.getByText(/error 404/i)).toBeInTheDocument();
  // });

  it('renders color name if color data is present', () => {
    render(<ProductDetails initialData={productData} />);
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('renders empty color if no color data', () => {
    const noColorData = {
      data: {
        id: 123,
        attributes: {
          ...productData.data.attributes,
          color: { data: null },
        },
      },
    };

    render(<ProductDetails initialData={noColorData} />);

    const colorElement = screen.getByText('', { selector: 'p' });

    expect(colorElement).toBeInTheDocument();
  });

  it('handles empty sizes data gracefully', () => {
    const noSizesData = {
      data: {
        id: 123,
        attributes: {
          ...productData.data.attributes,
          sizes: { data: null },
        },
      },
    };

    render(<ProductDetails initialData={noSizesData} />);

    const sizeButtons = screen.getAllByText(/EU-/i);
    sizeButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});
