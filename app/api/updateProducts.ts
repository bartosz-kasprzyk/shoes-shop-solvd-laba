'use server';

import { revalidatePath } from 'next/cache';
import { updateProduct } from './products';
import type {
  CreateProductDataProps,
  ProductResponseProps,
} from '@/features/products/types';

export async function updateProductAction(
  data: CreateProductDataProps,
): Promise<ProductResponseProps> {
  const res = await updateProduct({ productID: data.productID, ...data });

  revalidatePath('/products');
  revalidatePath(`/product/${data.productID}`);

  return res;
}
