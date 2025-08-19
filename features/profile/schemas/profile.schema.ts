import z from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string('Invalid name').nullable(),
    lastName: z.string('Invalid surname').nullable(),
    email: z.email('Invalid email'),
    phoneNumber: z
      .string()
      .nullable()
      .refine((val) => !val || /^\+?\d{7,15}$/.test(val), {
        message: 'Invalid phone number',
      }),
    avatar: z
      .object({
        id: z.number(),
        url: z.url().optional(),
      })
      .nullable()
      .optional(),
  })
  .extend({
    avatarUrl: z.url().optional().or(z.literal('')),
  });
