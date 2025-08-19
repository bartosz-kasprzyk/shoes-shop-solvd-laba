import type z from 'zod';
import type { productSchema } from '../schemas/product.schema';

export type Product = z.infer<typeof productSchema>;

import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

export interface ImageData {
  file: File;
  preview: string;
}

export interface AddProductFormProps {
  images: ImageData[];
  setImagesError: Dispatch<SetStateAction<string>>;
  setImages: Dispatch<SetStateAction<ImageData[]>>;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  header: string;
  text: string;
}

export interface Card {
  id: number;
  name: string;
  img: { src: string };
  price: number;
  gender: 'Men' | 'Women';
}

export interface ProductCardProps {
  card: Card;
  variant?: 'dropdown' | 'addToWishlist' | 'removeFromWishlist';
  onClick?: () => void;
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
}

type ImageFile = {
  file: File;
};

export interface CreateProductDataProps {
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
