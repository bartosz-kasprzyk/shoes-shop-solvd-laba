export interface promocode {
  code: string;
  text: string;
  discoutInPercent: number;
}

export interface PromocodeSectionProps {
  promocodes: promocode[];
  setPromocodes: React.Dispatch<React.SetStateAction<promocode[]>>;
  validPromocodes: promocode[];
  handleDeletePromocode: (code: string) => void;
}
