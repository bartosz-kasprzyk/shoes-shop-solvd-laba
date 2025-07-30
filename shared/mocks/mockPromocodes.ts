import type { promocode } from '../components/CartSummary/interface';

export const mockPromocodes: promocode[] = [
  { code: 'savingMoney', text: 'Free shipping', discoutInCash: 20 },
  { code: 'huntingPromos', text: '-30%', discoutInCash: 20 },
  {
    code: 'theFamilyBusiness',
    text: 'Third item is for free',
    discoutInCash: 60,
  },
];
