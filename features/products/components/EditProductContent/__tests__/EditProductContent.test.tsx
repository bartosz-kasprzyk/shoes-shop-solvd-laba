import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQueryClient } from '@tanstack/react-query';
import useUser from '@/shared/hooks/useUser';
import type { ReactNode } from 'react';

import type {
  AddProductFormProps,
  EditModalProps,
} from '@/features/products/types';
import type { CustomButtonProps } from '@/shared/components/ui/Button/interface';
import EditProductContent from '..';
import type { ProductFromServer } from '@/features/products/types/shared.interface';

export const mockProduct: ProductFromServer = {
  id: 123,
  attributes: {
    name: 'Nike Air Zoom',
    description: 'Test description',
    brand: {
      data: {
        id: 1,
        attributes: { name: 'Nike' },
      },
    },
    categories: {
      data: [{ id: 10, attributes: { name: 'Sneakers' } }],
    },
    color: {
      data: {
        id: 2,
        attributes: { name: 'Red' },
      },
    },
    gender: {
      data: {
        id: 3,
        attributes: { name: 'Unisex' },
      },
    },
    sizes: {
      data: [{ id: 101, attributes: { value: 42 } }],
    },
    price: 199,
    userID: 'user_123',
    teamName: 'Mock Team',
    images: {
      data: [
        {
          id: 1001,
          attributes: { url: '/images/mock-shoe-1.jpg' },
        },
      ],
    },
  },
};

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

describe('EditProductContent', () => {
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
    render(<EditProductContent productData={mockProduct} />);

    const nameInput = await screen.findByLabelText(/Product name/i);
    const priceInput = await screen.findByLabelText(/Price/i);
    const descriptionInput = await screen.findByLabelText(/Description/i);

    expect(nameInput).toHaveValue('Nike Air Zoom');
    expect(priceInput).toHaveValue('199');
    expect(descriptionInput).toHaveValue('Test description');
  });

  it('renders save button and can click it', async () => {
    render(<EditProductContent productData={mockProduct} />);
    const saveButton = await screen.findByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(saveButton);
  });
});
