export type PriceCategoryProps = {
  priceSet: boolean;
  handleChange: (newValue: number | number[], isSet: boolean) => void;
  filters: Record<string, any>;
  setIsControlled: (controlled: boolean) => void;
  isControlled: boolean;
};
