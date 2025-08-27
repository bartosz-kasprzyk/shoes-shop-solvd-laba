import type { CartItemForDisplay } from '../interface';

export interface CartListItemProps {
  cartItem: CartItemForDisplay;
  handleDeleteItem: () => void;
  handleQuantityChange: (newQuantity: number) => void;
}

export interface CartItemDetailsProps {
  cartItem: CartItemForDisplay;
}

export interface CartItemControlsProps {
  quantity: number;
  name: string;
  handleQuantityChange: (newQuantity: number) => void;
  handleDeleteItem: () => void;
}
