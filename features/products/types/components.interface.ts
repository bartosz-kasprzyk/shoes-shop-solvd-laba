import type {
  ImagesData,
  ProductApiResponse,
  // ProductData,
} from './shared.interface';
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
  onProductAction?: (product: Product | ProductFromServer) => void;
  isCard?: boolean;
}

type ProductsOnly = {
  products: Product[] | ProductFromServer[];
  pages?: never;
};

type PagesOnly = {
  products?: never;
  pages: { data: Product[] }[];
};

export type ProductsContainerProps = (ProductsOnly | PagesOnly) & CommonProps;

export interface ServerEntity<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface ProductFromServer {
  id: number;
  attributes: {
    name: string;
    description: string;
    brand: ServerEntity<{ name: string }>;
    categories: { data: { id: number; attributes: { name: string } }[] };
    color: ServerEntity<{ name: string }>;
    gender: ServerEntity<{ name: string }>;
    sizes: { data: { id: number; attributes: { value: number } }[] };
    price: number;
    userID: string;
    teamName: string;
    images: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
  };
}
