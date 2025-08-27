import { create } from 'zustand';

interface SearchState {
  isSearchBarOpen: boolean;
  searchValue: string;
  setIsSearchBarOpen: (isOpen: boolean) => void;
  setSearchValue: (value: string) => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isSearchBarOpen: false,
  searchValue: '',
  setIsSearchBarOpen: (isOpen) => set({ isSearchBarOpen: isOpen }),
  setSearchValue: (value) => set({ searchValue: value }),
  resetSearch: () => set({ isSearchBarOpen: false, searchValue: '' }),
}));
