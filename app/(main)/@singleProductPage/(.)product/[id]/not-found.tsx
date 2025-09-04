'use client';

import NotFound from '@/app/not-found';
import { removeRecentlyViewed } from '@/features/recently-viewed/utils/recentlyViewedUtils';
import useUser from '@/shared/hooks/useUser';
import { usePathname } from 'next/navigation';

export default function Error() {
  const id = usePathname().split('/').slice(-1)[0];
  const { session } = useUser();
  const userId = session?.user.id.toString();
  try {
    const parsedId = parseInt(id);
    removeRecentlyViewed(parsedId, userId);
  } catch (e) {
    console.log(e);
  }

  return (
    <NotFound
      title='This Product is no longer available'
      description="We're sorry, but the shoe you're looking for is no longer available. Don't worry, you can find plenty of other great options in our catalogue!"
      imageSrc='/error404.png'
      backButtonLabel='Go back'
      homeButtonLabel='Home'
      hasHeader={true}
    ></NotFound>
  );
}
