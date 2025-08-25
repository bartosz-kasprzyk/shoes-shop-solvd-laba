'use server';
import { revalidatePath } from 'next/cache';

export async function revalidateProductPaths(id: number) {
  revalidatePath('/products');
  revalidatePath(`/product/${id}`);
}
