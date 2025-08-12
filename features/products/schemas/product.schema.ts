import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  description: z.string().min(1, { message: 'Description is required' }),
  color: z.string().min(1, { message: 'Color is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  categories: z.string().min(1, { message: 'Category is required' }),
  sizes: z.array(z.string()).min(1, { message: 'Select at least one size' }),
});
