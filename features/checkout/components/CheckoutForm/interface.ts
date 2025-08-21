import type { PersonalInfo } from '../PersonalInfoSection/interface';
import type { ShippingInfo } from '../ShippingInfoSection/interface';
import type { PaymentInfo } from '../PaymentInfoSection/interface';

export interface CheckoutFormData {
  personalInfo: PersonalInfo;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
}

export interface CheckoutFormProps {
  onSubmit: (formData: CheckoutFormData) => void;
}
