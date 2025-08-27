export type WishlistButtonProps = {
  onClick?: () => void;
  operation: 'toggle' | 'remove';
  filled?: boolean;
};
