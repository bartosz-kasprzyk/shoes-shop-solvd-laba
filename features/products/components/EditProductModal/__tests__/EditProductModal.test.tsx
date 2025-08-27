import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '@/shared/hooks/useUser';
import type { ReactNode } from 'react';
import EditProductModal from '..';
import type {
  AddProductFormProps,
  EditModalProps,
} from '@/features/products/types';
import type { CustomButtonProps } from '@/shared/components/ui/Button/interface';

type MockEditModalProps = EditModalProps & { children?: ReactNode };

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    Modal: ({ children, ...rest }: MockEditModalProps) => (
      <div {...rest}>{children}</div>
    ),
  };
});

jest.mock('@/shared/hooks/useUser', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

jest.mock('../../AddProductForm', () => ({
  __esModule: true,
  default: ({ initialData }: AddProductFormProps) => (
    <div>
      <input
        aria-label='Product name'
        defaultValue={initialData?.attributes.name || ''}
      />
      <input
        aria-label='Price'
        defaultValue={initialData?.attributes.price || ''}
      />
      <textarea
        aria-label='Description'
        defaultValue={initialData?.attributes.description || ''}
      />
    </div>
  ),
}));

jest.mock('@/features/products/components/UploadedImagesContainer', () => ({
  __esModule: true,
  default: () => <div>ImageUploadGrid</div>,
}));

jest.mock('@/shared/icons', () => ({
  CloseIcon: ({
    onClick,
    style,
    ...rest
  }: {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
  }) => (
    <button aria-label='Close' onClick={onClick} style={style} {...rest}>
      X
    </button>
  ),
}));

jest.mock('@/shared/components/ui', () => ({
  __esModule: true,
  Button: (props: CustomButtonProps) => (
    <button {...props}>{props.children}</button>
  ),
}));

describe('EditProductModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ session: { user: { id: 1 } } });
    (useQueryClient as jest.Mock).mockReturnValue({
      getQueryData: () => ({
        pages: [
          {
            data: [
              {
                id: 123,
                attributes: {
                  name: 'Nike Air Zoom',
                  price: 199,
                  description: 'Test description',
                },
              },
            ],
          },
        ],
      }),
    });
  });

  it('renders with prefilled values', async () => {
    render(
      <EditProductModal isOpen={true} onClose={onClose} productId={123} />,
    );

    const nameInput = await screen.findByLabelText(/Product name/i);
    const priceInput = await screen.findByLabelText(/Price/i);
    const descriptionInput = await screen.findByLabelText(/Description/i);

    expect(nameInput).toHaveValue('Nike Air Zoom');
    expect(priceInput).toHaveValue('199');
    expect(descriptionInput).toHaveValue('Test description');
  });

  it('calls onClose when close button is clicked', async () => {
    render(
      <EditProductModal isOpen={true} onClose={onClose} productId={123} />,
    );
    const closeButton = await screen.findByLabelText(/Close/i);
    const user = userEvent.setup();
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders save button and can click it', async () => {
    render(
      <EditProductModal isOpen={true} onClose={onClose} productId={123} />,
    );
    const saveButton = await screen.findByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(saveButton);
  });
});
