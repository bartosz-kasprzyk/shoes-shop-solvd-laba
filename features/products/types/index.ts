import type z from 'zod';
import type { productSchema } from '../schemas/product.schema';
import type { Product } from '@/shared/interfaces/Product';

export type ProductSchemaType = z.infer<typeof productSchema>;

import type { Dispatch, SetStateAction, ChangeEvent } from 'react';
import type { ProductFromServer } from '@/features/products/types/shared.interface';

export interface ImageData {
  file?: File;
  preview: string;
  id?: number;
}

export interface AddProductFormProps {
  images: ImageData[];
  setImagesError: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  mode: 'create' | 'update';
  initialData?: ProductFromServer;
  formId: string;
  onLoadingChange: (pending: boolean) => void;
  productId?: number;
  onClose?: () => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  header: string;
  text: string;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
}

export interface Card {
  id: number;
  name: string;
  img: { src: string; hover?: string };
  price: number;
  gender: 'Men' | 'Women';
}

export interface ProductCardProps {
  card: Card;
  variant?: 'dropdown' | 'toggleWishlist' | 'removeFromWishlist';
  onClick?: () => void;
  filled?: boolean;
}

export interface SizeDisplayCheckboxProps {
  size: { value: string; label: string };
  isChecked: boolean;
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
}

export interface UploadedImagesContainerProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
  setImagesError: Dispatch<SetStateAction<string>>;
  imagesError: string;
}

export interface UploadeImageInputProps {
  handleAddImage: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface UploadedImageCardProps {
  idx: number;
  preview: string;
  deleteImage: (idx: number) => void;
  variant: 'delete' | 'deleteWithModal';
  fileId?: number;
}

export type ImageFile = {
  file: File;
  id: number;
};

export interface CreateProductDataProps {
  productID?: number;
  token: string;
  name: string;
  price: number;
  description: string;
  color: string;
  gender: string;
  brand: string;
  categories: string;
  sizes: string[];
  images: ImageFile[];
  userID: number;
  teamName: string;
  deletedImageIds?: number[];
}

export interface ProductAttributesProps {
  name: string;
  price: number;
  description: string;
  teamName: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductResponseProps {
  id: number;
  attributes: ProductAttributesProps;
}

export type FetchMyProductsResponse = {
  data: ProductFromServer[];
  currentPage: number;
  nextPage: number | null;
  total: number;
};

export type DeleteProductResponse = {
  data: Product;
};

export type MyProductsInfiniteData = {
  pages: {
    data: ProductFromServer[];
    nextPage?: number;
    total?: number;
  }[];
  pageParams: number[];
};
