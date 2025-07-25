import { Avatar } from '@mui/material';
import type { UserProfileProps } from './interface';

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className='p-6'>
      <div className='flex items-center space-x-3'>
        <Avatar
          src={user?.avatar}
          alt={user?.name || 'User'}
          sx={{ width: 48, height: 48 }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <div>
          <p className='text-sm text-[#98A2B3]'>Welcome</p>
          <p className='font-medium'>{user?.name || 'Jane Meldrum'}</p>
        </div>
      </div>
    </div>
  );
}
