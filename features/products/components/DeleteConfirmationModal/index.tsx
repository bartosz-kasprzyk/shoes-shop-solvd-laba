'use client';

import { Modal, Button, Box, Typography, Divider } from '@mui/material';
import type { DeleteModalProps } from '../../types';
import { useState } from 'react';
import CloseIcon from '../../../../shared/icons/CloseIcon';
import CustomButton from '../../../../shared/components/ui/Button';

export function DeleteModalUsageExample() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleModal = () => setIsOpen((prev) => !prev);
  const handleDelete = () => {
    console.log('Delete item');
    handleToggleModal();
  };

  return (
    <>
      <Button onClick={handleToggleModal}>Delete smth</Button>
      <DeleteConfirmationModal
        isOpen={isOpen}
        onClose={handleToggleModal}
        onDelete={handleDelete}
        header='Are you sure to delete selected item'
        text='Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur. '
      />
    </>
  );
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  header,
  text,
}: DeleteModalProps) {
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          padding: 3,
          '& .mui-4nmryk-MuiBackdrop-root-MuiModal-backdrop': {
            backgroundColor: 'rgba(243, 243, 243, 0.9)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            maxWidth: '656px',
            bgcolor: '#fff',
            borderRadius: '8px',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '24px', md: '56px' },
            outline: 'none',
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: '30px',
              right: '24px',
              minWidth: 'auto',
            }}
          >
            <CloseIcon />
          </Button>
          <Typography
            component='h2'
            sx={{
              pr: {
                xs: '34px',
                md: '22px',
              },
              fontWeight: 500,
              fontSize: {
                xs: '30px',
                md: '45px',
              },
            }}
          >
            {header}
          </Typography>
          <Typography
            sx={{ color: '#5C5C5C', fontWeight: 300, fontSize: '15px' }}
          >
            {text}
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'grid',
              gap: {
                xs: '13px',
                md: '30px',
              },
              gridTemplateColumns: '1fr 1fr',
            }}
          >
            <CustomButton
              variant='outline'
              sx={{
                height: {
                  xs: '40px',
                  md: '61px',
                },
              }}
              onClick={onClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              sx={{
                height: {
                  xs: '40px',
                  md: '61px',
                },
              }}
              onClick={onDelete}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
