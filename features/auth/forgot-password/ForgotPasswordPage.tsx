import { ForgotPasswordForm } from './ForgotPasswordForm';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';

export default function ForgotPasswordPage() {
  return (
    <AuthPagesWrapper
      title='Forgot Password'
      description="Don't worry, we'll send you reset instructions."
      form={<ForgotPasswordForm />}
    />
  );
}
