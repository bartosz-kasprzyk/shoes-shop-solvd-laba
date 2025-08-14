import type { CartListItem } from '@/features/checkout/components/CartListItem/interface';
import img1 from './assets/img-1.png';
import img2 from './assets/img-2.png';
import img3 from './assets/img-3.png';
import img4 from './assets/img-4.png';

const items: CartListItem[] = [
  {
    id: 1,
    img: img1,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend neque at mollis mollis. Nulla quis maximus justo. Suspendisse lacinia felis a turpis congue dignissim. Nullam elit ipsum, lacinia at magna ut, efficitur vehicula odio. Nunc aliquet ut odio non sodales. Donec tempor, elit quis convallis sodales, velit felis ultricies sapien, quis sagittis magna ligula a eros. Suspendisse sodales augue euismod arcu congue, at euismod nibh congue. Etiam accumsan, massa ac interdum lobortis, ligula augue auctor est, non eleifend erat metus eu erat. Cras porta sapien risus, vitae varius eros faucibus ac. Suspendisse finibus varius leo, ut tincidunt arcu viverra eget. Donec varius efficitur rhoncus.',
    price: 17000000,
    gender: 'Women',
    available: true,
    url: '/sign-in',
  },
  {
    id: 2,
    img: img2,
    name: 'Nike Air Max 90',
    price: 140,
    gender: 'Men',
    available: true,
    url: '/',
  },
  {
    id: 3,
    img: img3,
    name: "Nike Air Force 1 '07 SE",
    price: 160,
    gender: 'Women',
    available: true,
    url: '/sign-in',
  },
  {
    id: 4,
    img: img4,
    name: 'Nike Air Zoom Pegasus',
    price: 120,
    gender: 'Men',
    available: false,
    url: '/sign-in',
  },
];

export default items;
