import { Typography } from '@mui/material';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';

export default function ForgotPasswordPage() {
  return (
    <AuthPagesWrapper>
      <Typography variant='h3' fontWeight={500} mb={1}>
        Forgot Password
      </Typography>
      <Typography
        variant='body1'
        mb={5}
        color='color-mix(in srgb, black 60%, transparent)'
      >
        Don’t worry, we’ll send you reset instructions.
      </Typography>

      <ForgotPasswordForm />
    </AuthPagesWrapper>
  );
}
