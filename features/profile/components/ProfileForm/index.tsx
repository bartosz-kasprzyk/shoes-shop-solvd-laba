'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/shared/components/ui';
import { profileSchema } from '../../schemas/profile.schema';
import useProfile from '../../hooks/useProfile';
import { useEffect, useState } from 'react';
import type { AvatarOperation, Profile } from '../../types';
import AvatarUploader from '../AvatarUploader';
import useUser from '@/shared/hooks/useUser';
import { normalizeName } from '@/shared/utils/normalizeName';

export default function ProfileForm() {
  const { profile, onSubmit, isSubmitting } = useProfile();
  const { session, update } = useUser();

  const profileForm = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      avatarUrl: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = profileForm;

  const [avatarOperation, setAvatarOperation] =
    useState<AvatarOperation>('none');
  const [avatarFile, setAvatarFile] = useState<File | undefined>();

  const avatarUrl = watch('avatarUrl');

  useEffect(() => {
    if (profile.data) {
      profileForm.reset(profile.data);
      setAvatarFile(undefined);
      setAvatarOperation('none');
      setValue('avatarUrl', profile.data.avatar?.url);
    }
  }, [profile.data]);

  function changeAvatar(file: File) {
    setAvatarFile(file);
    setAvatarOperation('update');
    const newAvatarUrl = URL.createObjectURL(file);
    setValue('avatarUrl', newAvatarUrl);
  }

  function deleteAvatar() {
    setAvatarFile(undefined);
    setAvatarOperation('delete');
    setValue('avatarUrl', undefined);
  }

  async function handleFormSubmit(profile: Profile) {
    const { avatarUrl, ...rest } = profile;

    const firstName = normalizeName(profile.firstName || '');
    const lastName = normalizeName(profile.lastName || '');

    const cleanedProfile = {
      ...rest,
      firstName,
      lastName,
      avatar: avatarOperation === 'delete' ? null : rest.avatar,
    };

    await onSubmit({
      profile: cleanedProfile,
      avatarOperation,
      avatarFile,
    });

    await update({
      ...session,
      user: {
        ...session?.user,
        name: `${firstName} ${lastName}`,
        image: avatarUrl || undefined,
      },
    });
  }

  return profile.isLoading ? (
    <Box>Loading...</Box>
  ) : (
    <Box
      component='form'
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        maxWidth: '436px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        pointerEvents: isSubmitting ? 'none' : 'auto',
        opacity: isSubmitting ? 0.7 : 1,
      }}
    >
      <AvatarUploader
        avatarFile={avatarFile}
        avatarUrl={avatarUrl}
        onFileChange={(file) => changeAvatar(file)}
        onDelete={deleteAvatar}
      />

      <Typography
        variant='body1'
        sx={{
          fontWeight: 300,
          fontSize: {
            xs: '12px',
            md: '16px',
          },
          color: '#5C5C5C',
        }}
      >
        Welcome back! Please enter your details to log into your account.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <Input
          {...register('firstName')}
          title='Name'
          id='firstName'
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        ></Input>

        <Input
          {...register('lastName')}
          title='Surname'
          id='lastName'
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        ></Input>

        <Input
          {...register('email')}
          title='Email'
          id='email'
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled
        ></Input>

        <Input
          {...register('phoneNumber')}
          title='Phone number'
          id='phoneNumber'
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        ></Input>
      </Box>

      <Button
        type='submit'
        disabled={isSubmitting}
        sx={{
          alignSelf: 'flex-end',
          height: {
            xs: '30px',
            md: '40px',
          },
          width: '152px',
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={20} color='inherit' />
        ) : (
          'Submit'
        )}
      </Button>
    </Box>
  );
}
