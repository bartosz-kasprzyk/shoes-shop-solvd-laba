export type FiltersState = {
  Gender: string[];
  Brand: string[];
  Color: string[];
  Size: string[];
  Price: { range: [number, number]; set: boolean };
  category: string;
  search: string;
};
