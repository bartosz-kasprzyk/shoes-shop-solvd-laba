'use client';

import {
  Box,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Fade,
} from '@mui/material';
import { Input, Button } from '@/shared/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SignInFormData } from './signIn.schema';
import { signInSchema } from './signIn.schema';
import { useSignIn } from './useSignIn';
import { useEffect } from 'react';
import type { SignInFormProps } from './interface';

export function SignInForm({ callbackUrl, closeModal }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const { signInUser, serverError, success } = useSignIn(callbackUrl);

  useEffect(() => {
    if (success && closeModal) {
      const timer = setTimeout(() => {
        closeModal();
      }, 500); // close modal after short delay so success message shows
      return () => clearTimeout(timer);
    }
  }, [success, closeModal]);

  return (
    <form onSubmit={handleSubmit(signInUser)}>
      <Box display='flex' flexDirection='column' mb={2}>
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

        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            <FormControlLabel
              control={<Checkbox {...register('remember')} color='primary' />}
              label='Remember me'
              slotProps={{
                typography: {
                  sx: {
                    transition:
                      'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
                    fontSize: { xs: '10px', sm: '12px', lg: '15px' },
                  },
                },
              }}
            />
          </Typography>
          <Link
            underline='hover'
            href='/forgot-password'
            color='var(--color-primary)'
            sx={{
              transition:
                'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
              fontSize: { xs: '10px', sm: '12px', lg: '15px' },
            }}
          >
            Forgot password?
          </Link>
        </Box>
      </Box>

      <Box>
        <Typography
          position={'absolute'}
          sx={{ lineHeight: '1em' }}
          color='error'
          height={'line'}
          role={serverError ? 'alert' : undefined}
        >
          {serverError && !success ? serverError : '\u00A0'}
        </Typography>
        <Fade in={success}>
          <Typography textAlign='center' color='success.main'>
            Success! Redirecting...
          </Typography>
        </Fade>
      </Box>

      <Button
        type='submit'
        sx={{ width: '100%', my: 1 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
