export interface CartListItem {
  id: number;
  img: { src: string };
  name: string;
  price: number;
  gender: 'Men' | 'Women';
  available: boolean;
  url: string;
}

export interface CartListItemProps {
  cartItem: CartListItem;
  handleDelete: () => void;
}
