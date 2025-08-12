export interface ImageOverlayProps {
  children: React.ReactNode;
  variant: 'delete' | 'addToCart';
  onDelete?: () => void;
}
