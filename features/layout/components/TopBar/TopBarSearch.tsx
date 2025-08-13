import { SearchIcon } from '@/shared/icons';
import { Box, Button, TextField } from '@mui/material';

export default function TopBarSearch() {
  return (
    <>
      <Button
        sx={{
          display: { xs: 'flex', md: 'none' },
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          p: 1,
          minWidth: 'auto',
          transition: 'background-color 0.2s',
          '&:hover': {
            backgroundColor: '#f3f4f6',
          },
        }}
      >
        <SearchIcon />
      </Button>
      <TextField
        fullWidth
        placeholder='Search'
        size='small'
        slotProps={{
          input: {
            startAdornment: (
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <SearchIcon />
              </Box>
            ),
          },
        }}
        sx={{
          mr: 5,
          display: { xs: 'none', md: 'block' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '9999px',
            borderColor: '#494949',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          },
          '& .MuiInputBase-input::placeholder': {
            color: '#5C5C5C',
          },
        }}
      />
    </>
  );
}
