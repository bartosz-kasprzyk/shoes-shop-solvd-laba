export interface PaymentMethod {
  id: string;
  label: string;
  icon: React.ComponentType;
}

export interface AdditionalPaymentOption {
  value: string;
  label: string;
}

export interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
}
