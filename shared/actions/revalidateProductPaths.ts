'use server';
import { revalidatePath } from 'next/cache';

export async function revalidateProductPaths(id?: number) {
  revalidatePath('/products');
  if (id) {
    revalidatePath(`/product/${id}`);
  }
}
