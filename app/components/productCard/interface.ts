interface Card {
  id: number;
  name: string;
  img: { src: string };
  price: number;
  gender: 'Men' | 'Women';
}

interface ProductCardProps {
  card: Card;
}

export type { Card, ProductCardProps };
