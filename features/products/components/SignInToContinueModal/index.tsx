'use client';

import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@/shared/icons/CloseIcon';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { SignInForm } from '@/features/auth/sign-in/SignInForm';
import { Suspense } from 'react';
import type { SignInModalProps } from './interface';
import Spinner from '@/shared/components/ui/Loading';

export function SignInModal({
  isOpen,
  onClose,
  callbackUrl,
}: SignInModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(243, 243, 243, 0.9)',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 0, sm: '50%' },
          left: '50%',
          transform: {
            xs: 'translate(-50%, 0)',
            sm: 'translate(-50%, -50%)',
          },
          width: '90%',
          height: { xs: '100%', sm: 'auto' },
          maxWidth: '656px',
          bgcolor: '#fff',
          borderRadius: { xs: 0, sm: '8px' },
          p: 4,
          outline: 'none',
          padding: '30px',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <CloseIcon />
        </IconButton>

        <AuthPagesWrapper
          title='Welcome back'
          description='Welcome back! Please enter your details to log into your account.'
          form={
            <Suspense fallback={<Spinner />}>
              <SignInForm callbackUrl={callbackUrl} closeModal={onClose} />
            </Suspense>
          }
          textUnderButton={{
            text: "Don't have an account?",
            linkText: 'Sign up',
            href: '/sign-up',
          }}
        />
      </Box>
    </Modal>
  );
}
