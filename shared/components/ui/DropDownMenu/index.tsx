'use client';

import { Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import DeleteConfirmationModal from '@/features/products/components/DeleteConfirmationModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUser from '@/shared/hooks/useUser';
import { deleteProduct } from '@/app/api/products';
import { DropdownDotsIcon } from '@/shared/icons';

export default function DropDownMenu({ id }: { id: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { session } = useUser();
  const token = session?.user.accessToken as string;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === 'myProducts' &&
          query.queryKey[1] === session?.user.id,
      });

      setIsModalOpen(false);
    },
  });

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
    handleClose();
  };

  const handleDeleteProduct = () => {
    mutation.mutate(id);
  };

  return (
    <>
      <IconButton
        aria-label='more icon'
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          borderRadius: '20%',
          zIndex: 1,
        }}
        onClick={handleClick}
      >
        <DropdownDotsIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            mt: '10px',
            borderRadius: '8px',
          },
          '& .MuiMenuItem-root': {
            fontWeight: 300,
          },
        }}
        disableScrollLock
      >
        <MenuItem onClick={() => router.push(`/product/${id}`)}>View</MenuItem>
        <MenuItem onClick={() => handleAction('Edit')}>Edit</MenuItem>
        <MenuItem onClick={() => handleAction('Duplicate')}>Duplicate</MenuItem>
        <MenuItem onClick={() => setIsModalOpen(true)}>Delete</MenuItem>
      </Menu>
      {isModalOpen &&
        typeof window !== 'undefined' &&
        createPortal(
          <DeleteConfirmationModal
            isOpen={true}
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDeleteProduct}
            header='Are you sure to delete selected item '
            text='Lorem ipsum dolor sit amet consectetur. Sed imperdiet tempor facilisi massa aliquet sit habitant. Lorem ipsum dolor sit amet consectetur. '
          />,
          document.body,
        )}
    </>
  );
}
