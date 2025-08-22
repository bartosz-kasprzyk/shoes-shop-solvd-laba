'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/app/api/products';
import { useSnackbar } from '@/shared/hooks/useSnackbar';
import useUser from '@/shared/hooks/useUser';
import type { ProductSchemaType } from '../types';
import { updateProductAction } from '@/app/api/updateProducts';

type MutationType = 'create' | 'update';

export function useProductMutation(
  type: MutationType,
  productID: number | undefined,
  onSuccessCallback?: () => void,
) {
  const queryClient = useQueryClient();
  const { session } = useUser();
  const { showSnackbar } = useSnackbar();

  const id = session?.user.id as number;
  const token = session?.user.accessToken as string;

  const mutationFn = type === 'create' ? createProduct : updateProductAction;

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      showSnackbar(
        type === 'create' ? 'Product created!' : 'Product updated!',
        'success',
        5000,
      );
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'myProducts' && query.queryKey[1] === id,
      });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: () => {
      showSnackbar('Server error, please try later', 'error', 3000);
    },
  });

  const mutateProduct = (data: ProductSchemaType & { images: any[] }) => {
    mutation.mutate({
      ...data,
      productID,
      userID: id,
      teamName: 'team-5',
      token,
    });
  };

  return {
    ...mutation,
    mutateProduct,
  };
}
