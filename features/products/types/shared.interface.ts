export interface ImagesData {
  id: number;
  attributes: { url: string };
}

// interface Images {
//   data: ImagesData[];
// }

// interface SizeData {
//   id: number;
//   attributes: { value: number };
// }

// interface Sizes {
//   data: SizeData[] | null;
// }
export interface ServerEntity<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface ProductData {
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

export interface ProductApiResponse {
  data: ProductData;
}
