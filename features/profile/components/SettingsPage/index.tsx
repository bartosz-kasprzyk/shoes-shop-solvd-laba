import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProfileForm from '../ProfileForm';
import { Box, Typography } from '@mui/material';

export default function SettingsPage() {
  return (
    <ScrollableContainer>
      <Box
        sx={{
          padding: { xs: '20px 16px', sm: '20px 24px', md: '40px 60px' },
        }}
      >
        <Typography
          variant='h4'
          component='h2'
          sx={{
            fontWeight: 500,
            marginBottom: 6,
            color: '#1f2937',
            fontSize: { xs: 35, lg: 42 },
          }}
        >
          My Profile
        </Typography>

        <ProfileForm />
      </Box>
    </ScrollableContainer>
  );
}
