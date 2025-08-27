import type { promocode } from '@/features/cart/components/CartSummary/interface';

export const mockPromocodes: promocode[] = [
  { code: 'savingMoney', text: '-20%', discoutInPercent: 0.2 },
  { code: 'huntingPromos', text: '-10%', discoutInPercent: 0.1 },
  {
    code: 'theFamilyBusiness',
    text: '-30%',
    discoutInPercent: 0.3,
  },
];
