'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Collapse } from '@mui/material';
import { Button, Input } from '@/shared/components/ui';
import type { SignUpFormData} from './signUp.schema';
import { signUpSchema } from './signUp.schema';

type Props = {
  onSubmit: (data: SignUpFormData) => void;
  serverError: string | null;
  success: boolean;
};

export const SignUpForm = ({ onSubmit, serverError, success }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box gap={1} display='flex' flexDirection='column' mb={7}>
        <Input
          required
          title='Name'
          id='name'
          placeholder='Hayman Andrews'
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Input
          required
          title='Email'
          id='email'
          placeholder='example@mail.com'
          type='email'
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Input
          required
          title='Password'
          id='password'
          placeholder='At least 8 characters'
          type='password'
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Input
          required
          title='Confirm Password'
          id='confirmPassword'
          placeholder='At least 8 characters'
          type='password'
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        {serverError && <Typography color='error'>{serverError}</Typography>}
        <Collapse in={success}>
          <Typography textAlign='center' color='success.main'>
            Success! Redirecting...
          </Typography>
        </Collapse>
      </Box>
      <Button
        type='submit'
        sx={{ width: '100%', mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Sign up'}
      </Button>
    </form>
  );
};
