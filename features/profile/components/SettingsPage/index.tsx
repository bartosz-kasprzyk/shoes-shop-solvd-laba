import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProfileForm from '../ProfileForm';
import { Box, Typography } from '@mui/material';

export default function SettingsPage() {
  return (
    <ScrollableContainer>
      <Box
        sx={{
          px: { xs: 2, lg: '60px' },
          py: {
            xs: '20px',
            lg: '24px',
          },
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: { xs: '30px', md: '38px', lg: '45px' },
            transition:
              'font-size 0.3s ease-in-out, line-height 0.3s ease-in-out',
            fontWeight: 500,
            mb: { xs: '12px', lg: '24px' },
          }}
        >
          My Profile
        </Typography>

        <ProfileForm />
      </Box>
    </ScrollableContainer>
  );
}
