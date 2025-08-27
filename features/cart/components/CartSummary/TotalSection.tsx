import { Box, Typography } from '@mui/material';

export default function TotalSection({ total }: { total: string }) {
  return (
    <Box
      paddingY={2}
      px={2}
      marginTop='30px'
      display='flex'
      justifyContent='space-between'
      sx={{
        borderTop: '1px color-mix(in srgb, black 10%, transparent) solid',
        borderBottom: '1px color-mix(in srgb, black 10%, transparent) solid',
      }}
    >
      <Typography fontSize={{ xs: '0.8em' }} fontWeight={600}>
        Total
      </Typography>
      <Typography fontSize={{ xs: '0.8em' }} fontWeight={600}>
        ${total}
      </Typography>
    </Box>
  );
}
