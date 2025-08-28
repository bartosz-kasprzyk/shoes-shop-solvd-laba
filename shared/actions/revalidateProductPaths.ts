'use server';
import { revalidatePath } from 'next/cache';

export async function revalidateProductPaths(id?: number) {
  revalidatePath('/products', 'layout'); //very important dont delete!
  if (id) {
    revalidatePath(`/product/${id}`);
  }
}
