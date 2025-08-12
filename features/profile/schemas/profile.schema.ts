import z from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.email('Invalid email'),
    phoneNumber: z.string().nullable(),
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
