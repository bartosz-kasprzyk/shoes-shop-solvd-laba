import z from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .refine((data) => data.name.trim().split(/\s+/).length >= 2, {
    path: ['name'],
    message: 'Enter your full name',
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
