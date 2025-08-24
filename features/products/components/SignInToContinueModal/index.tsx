'use client';

import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@/shared/icons/CloseIcon';
import { AuthPagesWrapper } from '@/features/layout/components/AuthPagesWrapper';
import { SignInForm } from '@/features/auth/sign-in/SignInForm';
import { Suspense } from 'react';
import type { SignInModalProps } from './interface';

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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '656px',
          bgcolor: '#fff',
          borderRadius: '8px',
          p: 4,
          outline: 'none',
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
            <Suspense fallback={<div>Loading...</div>}>
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
