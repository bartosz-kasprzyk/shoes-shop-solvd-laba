import { create } from 'zustand';

type productsCountStore = {
  value?: number;
  setValue: (newValue?: number) => void;
  reset: () => void;
};

const useProductsCountStore = create<productsCountStore>((set) => ({
  value: undefined,

  setValue: (newValue) => set({ value: newValue }),

  reset: () => set({ value: undefined }),
}));

export default useProductsCountStore;
