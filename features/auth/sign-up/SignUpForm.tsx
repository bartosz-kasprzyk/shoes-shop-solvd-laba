'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography, Fade } from '@mui/material';
import { Button, Input } from '@/shared/components/ui';
import type { SignUpFormData } from './signUp.schema';
import { signUpSchema } from './signUp.schema';
import { useSignUp } from './useSignUp';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { registerUser, serverError, success } = useSignUp();

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <Box display='flex' flexDirection='column' mb={4}>
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
        <Box>
          <Typography
            position={'absolute'}
            sx={{ lineHeight: '1em' }}
            color='error'
            mb={2}
            height={'line'}
            role='alert'
          >
            {!!serverError && !success ? serverError : '\u00A0'}
          </Typography>
          <Fade in={success}>
            <Typography textAlign='center' color='success.main'>
              Success! Redirecting...
            </Typography>
          </Fade>
        </Box>
      </Box>
      <Button
        type='submit'
        sx={{ width: '100%', mt: 0 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Sign up'}
      </Button>
    </form>
  );
};
