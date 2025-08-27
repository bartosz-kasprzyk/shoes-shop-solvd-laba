import { Button } from '@/shared/components/ui';
import { useServerSession } from '@/shared/hooks/useServerSession';
import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRef } from 'react';

interface AvatarUploaderProps {
  avatarFile?: File;
  avatarUrl?: string;
  onFileChange: (file: File) => void;
  onDelete: () => void;
}

export default function AvatarUploader({
  avatarFile,
  avatarUrl,
  onFileChange,
  onDelete,
}: AvatarUploaderProps) {
  const session = useServerSession();
  const userName = session.user.name;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <>
      <input
        data-testid='file-input'
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileChange}
        hidden
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: '28px', md: '76px' },
          width: '100%',
          height: { xs: '100px', md: '150px' },
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      >
        <Box
          sx={{
            width: { xs: '100px', md: '150px' },
            height: { xs: '100px', md: '150px' },
            borderRadius: '50%',
            overflow: 'hidden',
            minWidth: '100px',
            minHeight: '100px',
            transition: 'width 0.3s ease, height 0.3s ease',
            border: '1px solid #CCCCCC',
          }}
        >
          <Avatar
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : avatarUrl || undefined
            }
            alt={userName || 'User'}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <Typography fontSize={{ xs: '2.5em', sm: '3.5em' }}>
              {' '}
              {userName ? userName.charAt(0).toUpperCase() : '?'}{' '}
            </Typography>
          </Avatar>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '16px', md: '24px' },
          }}
        >
          <Button
            sx={{
              width: {
                xs: '118px',
                md: '152px',
              },
              height: {
                xs: '30px',
                md: '40px',
              },
            }}
            onClick={handleFileSelect}
            variant='outline'
          >
            Change photo
          </Button>
          <Button
            sx={{
              width: {
                xs: '118px',
                md: '152px',
              },
              height: {
                xs: '30px',
                md: '40px',
              },
            }}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </>
  );
}
