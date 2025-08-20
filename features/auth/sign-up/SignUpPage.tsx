import { SignUpForm } from '@/features/auth/sign-up/SignUpForm';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';

export default function SignUpPage() {
  return (
    <AuthPagesWrapper
      title='Create an account'
      description='Create an account to get easy access to your dream shopping'
      form={<SignUpForm />}
      textUnderButton={{
        text: 'Already have an account?',
        linkText: 'Log in',
        href: '/sign-in',
      }}
    />
  );
}
