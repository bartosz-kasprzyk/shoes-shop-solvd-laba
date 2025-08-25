import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddProductForm from '..';
import { useAllOptions } from '@/shared/hooks/useAllOptions';
import { useProductMutation } from '@/features/products/hooks/useProductMutation';
import { adaptProductForEdit } from '../../EditProductModal/EditProduct.adapter';

jest.mock('@/shared/hooks/useAllOptions');
jest.mock('@/features/products/hooks/useProductMutation');
jest.mock('../../EditProductModal/EditProduct.adapter');

const mockMutateProduct = jest.fn();
const mockSetImages = jest.fn();
const mockSetImagesError = jest.fn();
const mockOnClose = jest.fn();
const mockOnLoadingChange = jest.fn();

(useAllOptions as jest.Mock).mockReturnValue({
  data: {
    colors: [{ value: 'Red', label: 'Red' }],
    categories: [{ value: 'Shoes', label: 'Shoes' }],
    genders: [{ value: 'Men', label: 'Men' }],
    brands: [{ value: 'Nike', label: 'Nike' }],
    sizes: [{ value: '38', label: 'EU-38' }],
  },
});

(useProductMutation as jest.Mock).mockReturnValue({
  mutateProduct: mockMutateProduct,
  isPending: false,
});

(adaptProductForEdit as jest.Mock).mockImplementation((data) => ({
  ...data,
  images: [{ url: '/img.jpg' }],
}));

describe('AddProductForm', () => {
  const defaultProps = {
    images: [],
    setImages: mockSetImages,
    setImagesError: mockSetImagesError,
    mode: 'create' as const,
    formId: 'test-form',
    onLoadingChange: mockOnLoadingChange,
    productId: undefined,
    onClose: mockOnClose,
  };

  it('renders all input fields and dropdowns', () => {
    render(<AddProductForm {...defaultProps} />);

    expect(screen.getByPlaceholderText('Nike Air Max 90')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Your description of the product...'),
    ).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Brand')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Add size')).toBeInTheDocument();
  });

  it('toggles sizes correctly', () => {
    render(<AddProductForm {...defaultProps} />);

    const sizeButton =
      screen.getByRole('button', { name: 'EU-EU-38' }) ||
      screen.getByText('EU-38');

    fireEvent.click(sizeButton);
    expect(sizeButton).toHaveStyle('background-color: #ffe6e6');

    fireEvent.click(sizeButton);
    expect(sizeButton).toHaveStyle('background-color: #fff');
  });

  it('calls onLoadingChange when isPending changes', async () => {
    const { rerender } = render(<AddProductForm {...defaultProps} />);
    expect(mockOnLoadingChange).toHaveBeenCalledWith(false);

    (useProductMutation as jest.Mock).mockReturnValue({
      mutateProduct: mockMutateProduct,
      isPending: true,
    });

    rerender(<AddProductForm {...defaultProps} />);
    await waitFor(() => {
      expect(mockOnLoadingChange).toHaveBeenCalledWith(true);
    });
  });
});
