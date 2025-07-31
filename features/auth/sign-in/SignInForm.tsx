'use client';
import {
  Box,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Input, Button, TextUnderButton } from '@/shared/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignInFormData } from './signIn.schema';
import { signInSchema } from './signIn.schema';

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => Promise<void | boolean>;
  serverError: string;
};

export function SignInForm({ onSubmit, serverError }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <Box mx='auto' px={2} maxWidth='600px' width='100%' my={4}>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Welcome back
      </Typography>
      <Typography
        variant='body1'
        mb={3}
        sx={{ color: 'color-mix(in srgb, black 60%, transparent)' }}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box gap={1} display='flex' flexDirection='column' mb={4}>
          <Input
            title='Email'
            id='email'
            type='email'
            placeholder='example@mail.com'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            required
          />
          <Input
            title='Password'
            id='password'
            placeholder='At least 8 characters'
            type='password'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            required
          />

          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography>
              <FormControlLabel
                control={<Checkbox {...register('remember')} color='primary' />}
                label='Remember me'
              />
            </Typography>
            <Link
              underline='hover'
              href='/auth/forgot-password'
              color='var(--color-primary)'
            >
              Forgot password?
            </Link>
          </Box>
        </Box>

        {serverError && (
          <Typography color='error' mb={2} role='alert'>
            {serverError}
          </Typography>
        )}

        <Button
          type='submit'
          sx={{ width: '100%', mb: 1 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <TextUnderButton
        text='Don’t have an account?'
        linkText='Sign up'
        href='/auth/sign-up'
      />
    </Box>
  );
}
