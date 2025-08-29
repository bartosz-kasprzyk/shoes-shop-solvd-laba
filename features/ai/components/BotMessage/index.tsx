import { Avatar, Box } from '@mui/material';

export default function BotMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      <Box
        sx={{
          width: 'fit-content',
          maxWidth: '80%',
          bgcolor: '#f3f4f6',
          borderRadius: '10px 10px 0px 10px',
          //   color: 'white',
          px: 2,
          py: 1,
          mb: 1,
          fontSize: '0.8rem',
        }}
      >
        {children}
      </Box>
      {/* <Avatar
        src={'/bot.png'}
        alt={'Bot'}
        sx={{
          width: { xs: '24px', lg: '36px' },
          height: { xs: '24px', lg: '36px' },
          backgroundColor: 'white',
        }}
      /> */}
    </Box>
  );
}
