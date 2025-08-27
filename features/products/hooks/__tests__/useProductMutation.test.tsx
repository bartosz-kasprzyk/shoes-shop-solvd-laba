import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createProduct } from '@/app/api/products';
import { updateProductAction } from '@/app/api/updateProducts';
import useUser from '@/shared/hooks/useUser';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import { useProductMutation } from '../useProductMutation';
import type { ImageData, ProductSchemaType } from '../../types';

jest.mock('@/app/api/products');
jest.mock('@/app/api/updateProducts');
jest.mock('@/shared/hooks/useUser');
jest.mock('@/shared/hooks/useSnackbar');

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProductMutation', () => {
  const session = {
    user: { id: 123, accessToken: 'token-123' },
  };

  const mockSnackbar = jest.fn();

  const validProduct: ProductSchemaType & { images: ImageData[] | [] } = {
    name: 'Test Product',
    price: 100,
    description: 'Some description',
    color: '',
    gender: '',
    brand: '',
    categories: '',
    sizes: [],
    images: [],
  };

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({ session });
    (useSnackbar as jest.Mock).mockReturnValue({ showSnackbar: mockSnackbar });
  });

  it('calls createProduct and shows success snackbar', async () => {
    (createProduct as jest.Mock).mockResolvedValue({ id: 1, name: 'Created' });
    jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useProductMutation('create', undefined),
      { wrapper },
    );

    act(() => {
      result.current.mutateProduct(validProduct);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(createProduct).toHaveBeenCalledWith({
      ...validProduct,
      productID: undefined,
      userID: 123,
      teamName: 'team-5',
      token: 'token-123',
    });

    expect(mockSnackbar).toHaveBeenCalledWith(
      'Product created!',
      'success',
      5000,
    );
    expect(queryClient.invalidateQueries).toHaveBeenCalled();
  });

  it('calls updateProductAction and shows success snackbar', async () => {
    (updateProductAction as jest.Mock).mockResolvedValue({
      id: 1,
      name: 'Updated',
    });
    jest.spyOn(queryClient, 'invalidateQueries');

    const onSuccessCallback = jest.fn();

    const { result } = renderHook(
      () => useProductMutation('update', 55, onSuccessCallback),
      { wrapper },
    );

    act(() => {
      result.current.mutateProduct(validProduct);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(updateProductAction).toHaveBeenCalledWith({
      ...validProduct,
      productID: 55,
      userID: 123,
      teamName: 'team-5',
      token: 'token-123',
    });

    expect(mockSnackbar).toHaveBeenCalledWith(
      'Product updated!',
      'success',
      5000,
    );
    expect(queryClient.invalidateQueries).toHaveBeenCalled();
    expect(onSuccessCallback).toHaveBeenCalled();
  });

  it('shows error snackbar on mutation failure', async () => {
    (createProduct as jest.Mock).mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(
      () => useProductMutation('create', undefined),
      { wrapper },
    );

    act(() => {
      result.current.mutateProduct(validProduct);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockSnackbar).toHaveBeenCalledWith(
      'Server error, please try later',
      'error',
      3000,
    );
  });
});
