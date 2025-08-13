import { ScrollableContainer } from '@/features/layout/components/ScrollableContainer';
import ProfileForm from '@/features/profile/components/ProfileForm';
import { Box } from '@mui/material';

export default function ProfilePage() {
  return (
    <ScrollableContainer>
      <Box sx={{ px: '60px', py: '50px' }}>
        <h1>My Profile</h1>
        <ProfileForm />
      </Box>
    </ScrollableContainer>
  );
}
