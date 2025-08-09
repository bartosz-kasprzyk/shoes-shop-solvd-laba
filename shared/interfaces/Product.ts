export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    brand: string;
    categories: string[];
    color: string;
    gender: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    sizes: string[];
    price: number | null;
    userID: string;
    teamName: string;
    images: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
  };
}
