export type OptionItem = {
  value: string;
  label: string;
};

export type AllOptionsProps = {
  colors: OptionItem[];
  genders: OptionItem[];
  brands: OptionItem[];
  categories: OptionItem[];
  sizes: OptionItem[];
};
