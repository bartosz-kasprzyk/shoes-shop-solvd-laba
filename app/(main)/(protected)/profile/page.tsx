// 'use client';

import ProfileForm from '@/features/profile/components/ProfileForm';
import { Box } from '@mui/material';

export default function ProfilePage() {
  return (
    <Box sx={{ px: '60px', py: '50px' }}>
      <h1>My Profile</h1>
      <ProfileForm />
    </Box>
    // <div>
    //   <h1>My Profile</h1>
    //   <ProfileForm />
    // </div>
  );
}
