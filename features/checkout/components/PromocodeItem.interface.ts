import type { promocode } from './CartSummary/interface';

export interface PromocodeItemProps {
  promocode: promocode;
  onRemove: (code: string) => void;
}
