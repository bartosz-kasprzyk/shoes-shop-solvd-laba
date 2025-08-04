import { Box } from '@mui/material';
import type { SizeDisplayCheckboxProps } from '../../types';

const SizeDisplayCheckbox = ({
  size,
  isChecked,
  setSelectedSizes,
}: SizeDisplayCheckboxProps) => {
  function chooseSize() {
    setSelectedSizes((prev) =>
      isChecked ? prev.filter((v) => v !== size.value) : [...prev, size.value],
    );
  }

  return (
    <Box
      key={size.value}
      component='button'
      type='button'
      onClick={chooseSize}
      sx={{
        px: '14px',
        py: 2,
        border: '1px solid',
        borderColor: isChecked ? '#FE645E' : '#494949',
        borderRadius: '8px',
        backgroundColor: isChecked ? '#ffe6e6' : '#fff',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        fontWeight: 300,
        fontSize: '15px',
        '&:hover': {
          borderColor: '#FE645E',
        },
      }}
    >
      EU-{size.label}
    </Box>
  );
};

export default SizeDisplayCheckbox;
