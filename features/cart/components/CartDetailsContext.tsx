'use client';

import React, { createContext, useContext } from 'react';
import type { CartItemForDisplay, CartItemWithProduct } from './interface';
import { fetchProductById } from '@/features/products/components/ProductDetails/api/productApi';
import type { ProductData } from '@/features/products/types/shared.interface';
import { useQueries } from '@tanstack/react-query';
import { useCart } from '@/shared/hooks/useCart';

interface CartDetailsContextType {
  cartItems: CartItemForDisplay[];
  handleQuantityChange: (
    productId: string,
    size: string,
    newQuantity: number,
  ) => void;
  handleDeleteItem: (productId: string, size: string) => void;
}

const CartDetailsContext = createContext<CartDetailsContextType | null>(null);

export const useCartDetails = () => {
  const context = useContext(CartDetailsContext);
  if (!context) {
    throw new Error('useCartDetails must be used within a CartDetailsProvider');
  }
  return context;
};

export const CartDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cart, updateQuantity, deleteItem } = useCart();

  const uniqueProductIds = Array.from(
    new Set(cart.map((item) => item.productId)),
  );

  const productQueries = useQueries({
    queries: uniqueProductIds.map((productId) => ({
      queryKey: ['product', productId],
      queryFn: () => fetchProductById(productId),
      staleTime: 5 * 60 * 1000,
    })),
  });

  if (productQueries.some((q) => q.isLoading)) return <p>Loading...</p>;

  const products: ProductData[] = productQueries
    .map((q) => q.data?.data)
    .filter((p): p is ProductData => !!p);

  const cartWithProducts: CartItemWithProduct[] = cart
    .map((item) => {
      const product = products.find((p) => String(p.id) === item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((item): item is CartItemWithProduct => item !== null);

  const cartItemsForComponent: CartItemForDisplay[] = cartWithProducts.map(
    (item) => ({
      id: item.product.id,
      img: {
        src:
          item.product.attributes.images.data?.[0]?.attributes.url ??
          '/shoe-welcome.png',
      },
      name: item.product.attributes.name,
      price: item.product.attributes.price,
      gender: item.product.attributes.gender.data?.attributes.name as
        | 'Men'
        | 'Women',
      available: true,
      size: item.size,
      quantity: item.quantity,
    }),
  );

  const value = {
    cartItems: cartItemsForComponent,
    handleQuantityChange: updateQuantity,
    handleDeleteItem: deleteItem,
  };

  return (
    <CartDetailsContext.Provider value={value}>
      {children}
    </CartDetailsContext.Provider>
  );
};
