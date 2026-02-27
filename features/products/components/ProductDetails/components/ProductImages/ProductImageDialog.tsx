import { Dialog, Box } from '@mui/material';

export default function ProductImageDialog({
  imageUrl,
  onClose,
}: {
  imageUrl: string | null;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={!!imageUrl}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        sx: {
          m: 0,
          p: 0,
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          background: 'transparent',
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      }}
    >
      {imageUrl && (
        <Box
          component='img'
          src={imageUrl}
          alt='Expanded product'
          sx={{
            objectFit: 'contain',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: 'auto',
            height: 'auto',
            cursor: 'zoom-out',
          }}
        />
      )}
    </Dialog>
  );
}
