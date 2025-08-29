export interface ImageOverlayProps {
  children: React.ReactNode;
  variant: 'delete' | 'deleteWithModal' | 'addToCart';
  onDelete?: () => void;
}
