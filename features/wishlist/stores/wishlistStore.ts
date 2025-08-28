'use client';

import { create } from 'zustand';
import {
  getWishlist,
  addToWishlist as addToWishlistUtils,
  removeFromWishlist as removeFromWishlistUtils,
} from '@/features/wishlist/utils/wishlist';

type ToggleSnackFn = (
  msg: string,
  type: 'success' | 'warning',
  duration?: number,
) => void;

type RemoveSnackFn = (msg: string, type: 'warning', duration?: number) => void;

interface WishlistState {
  wishlistIds: Set<number>;
  toggleWishlist: (
    id: number,
    userId?: string,
    showSnackbar?: ToggleSnackFn,
  ) => void;
  removeFromWishlist: (
    id: number,
    userId?: string,
    showSnackbar?: RemoveSnackFn,
  ) => void;
  setInitialWishlist: (userId?: string) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: new Set<number>(),

  setInitialWishlist: (userId) => {
    const stored = getWishlist(userId);
    set({ wishlistIds: new Set(stored) });
  },

  toggleWishlist: (id, userId, showSnackbar) => {
    const wishlist = new Set(get().wishlistIds);

    if (wishlist.has(id)) {
      wishlist.delete(id);
      removeFromWishlistUtils(id, userId);
      showSnackbar?.('Product removed from wishlist', 'warning', 3000);
    } else {
      wishlist.add(id);
      addToWishlistUtils(id, userId);
      showSnackbar?.('Product added to wishlist', 'success', 3000);
    }

    set({ wishlistIds: wishlist });
  },

  removeFromWishlist: (id, userId, showSnackbar) => {
    const wishlist = new Set(get().wishlistIds);
    if (!wishlist.has(id)) return;

    wishlist.delete(id);
    removeFromWishlistUtils(id, userId);
    showSnackbar?.('Product removed from wishlist', 'warning', 3000);

    set({ wishlistIds: wishlist });
  },
}));
