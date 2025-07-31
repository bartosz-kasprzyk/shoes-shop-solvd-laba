import { boolean, z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
