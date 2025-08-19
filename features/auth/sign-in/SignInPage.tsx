import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { TextUnderButton } from '@/shared/components/ui';
import { Typography } from '@mui/material';
import { SignInForm } from './SignInForm';

export default function SignInPage() {
  return (
    <AuthPagesWrapper>
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

      <SignInForm />

      <TextUnderButton
        text="Don't have an account?"
        linkText='Sign up'
        href='/sign-up'
      />
    </AuthPagesWrapper>
  );
}
