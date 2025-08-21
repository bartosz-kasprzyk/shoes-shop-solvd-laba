export interface ShippingInfo {
  country: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;
}

export interface ShippingInfoSectionProps {
  shippingInfo: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
}
