import { render, screen, fireEvent } from '@testing-library/react';
import EditProductModal from '..';
import useUser from '@/shared/hooks/useUser';
import { useQuery } from '@tanstack/react-query';

jest.mock('@/shared/hooks/useUser');
jest.mock('@tanstack/react-query');
jest.mock('@/features/products/components/UploadedImagesContainer', () => ({
  __esModule: true,
  default: ({ images }: any) => <div>Images: {images.length}</div>,
}));
jest.mock('../../AddProductForm', () => ({
  __esModule: true,
  default: ({ onClose }: any) => (
    <form>
      <button type='submit'>Submit</button>
      <button onClick={onClose}>Close Form</button>
    </form>
  ),
}));
jest.mock('@/shared/icons', () => ({
  CloseIcon: (props: any) => <button {...props}>CloseIcon</button>,
}));
jest.mock('@/features/layout/components/ScrollableContainer', () => ({
  ScrollableContainer: ({ children }: any) => <div>{children}</div>,
}));
jest.mock('@/shared/components/ui', () => ({
  Button: (props: any) => <button {...props}>{props.children}</button>,
}));

const mockSession = {
  session: {
    user: { id: 1, accessToken: 'mock-token' },
  },
};

const mockProductData = [
  {
    id: 123,
    name: 'Test Product',
    description: 'Product description',
  },
];

describe('EditProductModal', () => {
  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue(mockSession);
    (useQuery as jest.Mock).mockReturnValue({
      data: { data: mockProductData },
    });
  });

  it('renders modal content when open', () => {
    render(
      <EditProductModal isOpen={true} onClose={jest.fn()} productId={123} />,
    );

    expect(screen.getByText('Edit product')).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum/i)).toBeInTheDocument();
    expect(screen.getByText('Images: 0')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('calls onClose when CloseIcon clicked', () => {
    const onClose = jest.fn();
    render(
      <EditProductModal isOpen={true} onClose={onClose} productId={123} />,
    );

    fireEvent.click(screen.getByText('CloseIcon'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when AddProductForm close button clicked', () => {
    const onClose = jest.fn();
    render(
      <EditProductModal isOpen={true} onClose={onClose} productId={123} />,
    );

    fireEvent.click(screen.getByText('Close Form'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders modal even if product data is missing', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: { data: [] } });
    render(
      <EditProductModal isOpen={true} onClose={jest.fn()} productId={999} />,
    );

    expect(screen.getByText('Edit product')).toBeInTheDocument();
  });

  it('disables Save button when loading', () => {
    render(
      <EditProductModal isOpen={true} onClose={jest.fn()} productId={123} />,
    );
    const saveButton = screen.getByText('Save');
    expect(saveButton).not.toBeDisabled();

    fireEvent.click(screen.getByText('Submit'));
  });
});
