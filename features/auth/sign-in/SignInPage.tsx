import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { SignInForm } from './SignInForm';
import { Suspense } from 'react';
import Spinner from '@/shared/components/ui/Loading';

export default function SignInPage() {
  return (
    <AuthPagesWrapper
      title='Welcome back'
      description='Welcome back! Please enter your details to log into your account.'
      form={
        <Suspense fallback={<Spinner />}>
          <SignInForm />
        </Suspense>
      }
      textUnderButton={{
        text: "Don't have an account?",
        linkText: 'Sign up',
        href: '/sign-up',
      }}
    />
  );
}
