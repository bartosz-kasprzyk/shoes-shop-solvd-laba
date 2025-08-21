import type { CardPaymentData } from '../CardPaymentForm/interface';

export interface PaymentInfo extends CardPaymentData {
  paymentMethod: string;
}

export interface PaymentInfoSectionProps {
  paymentInfo: PaymentInfo;
  onPaymentMethodChange: (method: string) => void;
  onPaymentDataChange: (field: keyof CardPaymentData, value: string) => void;
}
