import type { ImagesData, ProductApiResponse } from './shared.interface';
import type { Product } from '@/shared/interfaces/Product';

export interface ProductImagesProps {
  images: ImagesData[];
}

export interface SizeSelectorProps {
  availableSizes: Set<number>;
  selectedSize: number | null;
  setSelectedSize: (size: number) => void;
  showSizeWarning: boolean;
  setShowSizeWarning: (value: boolean) => void;
}

export interface ProductDetailsProps {
  initialData: ProductApiResponse;
}

export type ProductActionVariant =
  | 'dropdown'
  | 'addToWishlist'
  | 'removeFromWishlist';

interface CommonProps {
  variant?: ProductActionVariant;
  onProductAction?: (product: Product) => void;
  isCard?: boolean;
}

type ProductsOnly = {
  products: Product[];
  pages?: never;
};

type PagesOnly = {
  products?: never;
  pages: { data: Product[] }[];
};

export type ProductsContainerProps = (ProductsOnly | PagesOnly) & CommonProps;
