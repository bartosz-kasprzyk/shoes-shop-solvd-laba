export interface CardPaymentData {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  country: string;
}

export interface CardPaymentFormProps {
  paymentData: CardPaymentData;
  onChange: (field: keyof CardPaymentData, value: string) => void;
}
