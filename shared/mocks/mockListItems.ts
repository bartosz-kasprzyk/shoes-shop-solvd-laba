import type { CartItemForDisplay } from '@/features/cart/components/interface';
import img1 from './assets/img-1.png';
import img2 from './assets/img-2.png';
import img3 from './assets/img-3.png';
import img4 from './assets/img-4.png';

const items: CartItemForDisplay[] = [
  {
    id: 1,
    img: img1,
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend neque at mollis mollis. Nulla quis maximus justo. Suspendisse lacinia felis a turpis congue dignissim. Nullam elit ipsum, lacinia at magna ut, efficitur vehicula odio. Nunc aliquet ut odio non sodales. Donec tempor, elit quis convallis sodales, velit felis ultricies sapien, quis sagittis magna ligula a eros. Suspendisse sodales augue euismod arcu congue, at euismod nibh congue. Etiam accumsan, massa ac interdum lobortis, ligula augue auctor est, non eleifend erat metus eu erat. Cras porta sapien risus, vitae varius eros faucibus ac. Suspendisse finibus varius leo, ut tincidunt arcu viverra eget. Donec varius efficitur rhoncus.',
    price: 17000000,
    gender: 'Women',
    available: true,
    size: '39',
    quantity: 1,
  },
  {
    id: 2,
    img: img2,
    name: 'Nike Air Max 90',
    price: 140,
    gender: 'Men',
    available: true,
    size: '38',
    quantity: 1,
  },
  {
    id: 3,
    img: img3,
    name: "Nike Air Force 1 '07 SE",
    price: 160,
    gender: 'Women',
    available: true,
    size: '37',
    quantity: 1,
  },
  {
    id: 4,
    img: img4,
    name: 'Nike Air Zoom Pegasus',
    price: 120,
    gender: 'Men',
    available: false,
    size: '39',
    quantity: 1,
  },
];

export default items;
