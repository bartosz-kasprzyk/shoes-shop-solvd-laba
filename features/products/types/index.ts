import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

export interface ImageData {
  file: File;
  preview: string;
}

export interface AddProductFormProps {
  images: ImageData[];
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
}

export interface SizeDisplayCheckboxProps {
  size: { value: string; label: string };
  isChecked: boolean;
  setSelectedSizes: Dispatch<SetStateAction<string[]>>;
}

export interface UploadedImagesContainerProps {
  images: ImageData[];
  setImages: Dispatch<SetStateAction<ImageData[]>>;
}

export interface UploadeImageInputProps {
  handleAddImage: (event: ChangeEvent<HTMLInputElement>) => void;
}
