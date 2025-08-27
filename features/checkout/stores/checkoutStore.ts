import { create } from 'zustand';

type CheckoutStore = {
  submit: (() => void) | null;
  setSubmit: (fn: () => void) => void;
  clearSubmit: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  submit: null,
  setSubmit: (fn) => set({ submit: fn }),
  clearSubmit: () => set({ submit: null }),
  loading: false,
  setLoading: (loading) => set({ loading }),
}));
