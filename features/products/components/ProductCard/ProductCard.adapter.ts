import type { Card } from '../../types/index';
import type { Product } from '../../../../shared/interfaces/Product';
import type { WishlistItem } from '@/features/products/types/shared.interface';

export function adaptProductToCard(product: Product): Card {
  return {
    id: product.id,
    name: product.attributes.name,
    img: {
      src:
        product.attributes?.images?.data?.[0].attributes.url ??
        '/shoe-welcome.png',
    },
    price: product.attributes.price ?? 0,
    gender:
      product.attributes?.gender?.data?.attributes.name === 'Men'
        ? 'Men'
        : 'Women',
  };
}

export function adaptWishlistItemToCard(product: WishlistItem): Card {
  return {
    id: product.id,
    name: product.name,
    img: {
      src: product.images?.data?.[0]?.attributes?.url ?? '/shoe-welcome.png',
    },
    price: product.price ?? 0,
    gender: product.gender?.data?.attributes.name === 'Men' ? 'Men' : 'Women',
  };
}
