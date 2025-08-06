import type { ImagesData, ProductApiResponse } from './shared.interface';

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
  id: string;
  initialData?: ProductApiResponse | null;
}
