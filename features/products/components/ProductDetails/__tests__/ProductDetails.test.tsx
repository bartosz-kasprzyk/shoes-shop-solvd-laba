import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetails from '..';
import { useSession } from 'next-auth/react';

const showSnackbarMock = jest.fn();
const addItemMock = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

(useSession as jest.Mock).mockReturnValue({
  data: { user: { accessToken: 'fake' } },
});

jest.mock('@/shared/hooks/useSnackbar', () => ({
  useSnackbar: () => ({ showSnackbar: showSnackbarMock }),
}));

jest.mock('@/app/not-found', () => {
  const NotFound = () => <div>Error 404</div>;
  NotFound.displayName = 'NotFound';
  return NotFound;
});

jest.mock('@/shared/hooks/useCart', () => ({
  useCart: () => ({ addItem: addItemMock }),
}));

const productData = {
  data: {
    id: 123,
    attributes: {
      name: 'Nike Air',
      price: 149,
      description: 'Desc',
      brand: { data: { id: 1, attributes: { name: 'Nike' } } },
      categories: { data: [{ id: 1, attributes: { name: 'Shoes' } }] },
      color: { data: { id: 1, attributes: { name: 'White' } } },
      gender: { data: { id: 1, attributes: { name: 'Men' } } },
      sizes: { data: [{ id: 1, attributes: { value: 38 } }] },
      images: {
        data: [{ id: 101, attributes: { url: '/mock-image.jpg' } }],
      },
      userID: '123',
      teamName: 'team5',
    },
  },
};

describe('ProductDetails', () => {
  it('renders product info', () => {
    render(<ProductDetails initialData={productData} />);

    expect(screen.getByText('Nike Air')).toBeInTheDocument();
    expect(screen.getByText(/149/)).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });

  it('adds product to wishlist when authenticated', () => {
    render(<ProductDetails initialData={productData} />);
    fireEvent.click(screen.getByText('Add to Wishlist'));

    expect(showSnackbarMock).toHaveBeenCalledWith(
      'Product added to wishlist',
      'success',
      5000,
    );
  });

  it('shows warning if Add to Cart clicked without selecting size', () => {
    render(<ProductDetails initialData={productData} />);

    fireEvent.click(screen.getByText('Add to Cart'));

    expect(screen.getByText(/please choose your size/i)).toBeInTheDocument();
  });

  it('shows alert when Add to Cart clicked with size selected', () => {
    render(<ProductDetails initialData={productData} />);

    fireEvent.click(screen.getByText('EU-38'));
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(addItemMock).toHaveBeenCalledWith({
      productId: productData.data.id.toString(),
      size: '38',
      quantity: 1,
    });
  });

  it('renders color name if color data is present', () => {
    render(<ProductDetails initialData={productData} />);
    expect(screen.getByText('White')).toBeInTheDocument();
  });
});
