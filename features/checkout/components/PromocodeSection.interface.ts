import type { promocode } from './CartSummary/interface';

export interface PromocodeSectionProps {
  promocodes: promocode[];
  setPromocodes: React.Dispatch<React.SetStateAction<promocode[]>>;
  validPromocodes: promocode[];
  handleDeletePromocode: (code: string) => void;
}
