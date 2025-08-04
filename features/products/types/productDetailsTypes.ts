export interface ImagesData {
  id: number;
  attributes: { url: string };
}

interface Images {
  data: ImagesData[];
}

interface SizeData {
  id: number;
  attributes: { value: number };
}

interface Sizes {
  data: SizeData[];
}

interface ProductData {
  id: number;
  attributes: {
    name: string;
    images: Images;
    price: number;
    color: { data: { attributes: { name: string } } };
    sizes: Sizes;
    description: string;
  };
}

export interface ProductApiResponse {
  data: ProductData;
}

export interface ProductDetailsProps {
  id: string;
  initialData?: ProductApiResponse | null;
}

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
