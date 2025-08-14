import type { Card } from '@/features/products/types';
import img1 from './assets/img-1.png';
import img2 from './assets/img-2.png';
import img3 from './assets/img-3.png';
import img4 from './assets/img-4.png';

const cards: Card[] = [
  {
    id: 1,
    img: img1,
    name: 'Nike Air Max 270',
    price: 160,
    gender: 'Women',
  },
  { id: 2, img: img2, name: 'Nike Air Max 90', price: 140, gender: 'Men' },
  {
    id: 3,
    img: img3,
    name: "Nike Air Force 1 '07 SE",
    price: 160,
    gender: 'Women',
  },
  {
    id: 4,
    img: img4,
    name: 'Nike Air Zoom Pegasus',
    price: 120,
    gender: 'Men',
  },
];

export default cards;
