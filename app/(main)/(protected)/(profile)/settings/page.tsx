import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProfileForm from '@/features/profile/components/ProfileForm';
import { Box } from '@mui/material';

export default function ProfilePage() {
  return (
    <ScrollableContainer>
      <Box
        sx={{
          px: { xs: 2, lg: '60px' },
          py: {
            xs: 'none',
            lg: '24px',
          },
        }}
      >
        <h1>My Profile</h1>
        <ProfileForm />
      </Box>
    </ScrollableContainer>
  );
}
