import { Typography } from '@mui/material';
import { TextUnderButton } from '@/shared/components/ui';
import { SignUpForm } from '@/features/auth/sign-up/SignUpForm';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';

export default function SignUpPage() {
  return (
    <AuthPagesWrapper>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Create an account
      </Typography>
      <Typography
        variant='body1'
        mb={3}
        sx={{ color: 'color-mix(in srgb, black 60%, transparent)' }}
      >
        Create an account to get easy access to your dream shopping
      </Typography>

      <SignUpForm />

      <TextUnderButton
        text='Already have an account?'
        linkText='Log in'
        href='/sign-in'
      />
    </AuthPagesWrapper>
  );
}
