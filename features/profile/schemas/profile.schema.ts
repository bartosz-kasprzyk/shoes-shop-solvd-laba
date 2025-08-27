import z from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string('Invalid name').nonempty('Name cannot be empty'),
    lastName: z.string('Invalid surname').nonempty('Surname cannot be empty'),
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

export const profileUpdateSchema = profileSchema.omit({
  email: true,
  avatarUrl: true,
});
