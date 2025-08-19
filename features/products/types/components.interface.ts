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

export type ProductsContainerProps =
  | { products: Product[]; pages?: never; withOverlay?: boolean }
  | { products?: never; pages: { data: Product[] }[]; withOverlay?: boolean };
