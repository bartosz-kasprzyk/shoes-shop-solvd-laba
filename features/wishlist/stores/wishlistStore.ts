'use client';

import { create } from 'zustand';
import {
  getWishlist,
  addToWishlist as addToWishlistUtils,
  removeFromWishlist as removeFromWishlistUtils,
} from '@/features/wishlist/utils/wishlist';

interface WishlistState {
  wishlistIds: Set<number>;
  toggleWishlist: (
    id: number,
    showSnackbar?: (msg: string, type: 'success' | 'warning') => void,
  ) => void;
  removeFromWishlist: (
    id: number,
    showSnackbar?: (msg: string, type: 'warning') => void,
  ) => void;
  setInitialWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: new Set(),

  setInitialWishlist: () => {
    const stored = getWishlist();
    set({ wishlistIds: new Set(stored) });
  },

  toggleWishlist: (id, showSnackbar) => {
    const wishlist = new Set(get().wishlistIds);

    if (wishlist.has(id)) {
      wishlist.delete(id);
      removeFromWishlistUtils(id);
      showSnackbar?.('Product removed from wishlist', 'warning');
    } else {
      wishlist.add(id);
      addToWishlistUtils(id);
      showSnackbar?.('Product added to wishlist', 'success');
    }

    set({ wishlistIds: wishlist });
  },

  removeFromWishlist: (id, showSnackbar) => {
    const wishlist = new Set(get().wishlistIds);
    if (!wishlist.has(id)) return;

    wishlist.delete(id);
    removeFromWishlistUtils(id);
    showSnackbar?.('Product removed from wishlist', 'warning');

    set({ wishlistIds: wishlist });
  },
}));
