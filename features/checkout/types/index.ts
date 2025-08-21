export type { PersonalInfo } from '../components/PersonalInfoSection';
export type { ShippingInfo } from '../components/ShippingInfoSection';
export type { PaymentInfo } from '../components/PaymentInfoSection';
export type { CardPaymentData } from '../components/CardPaymentForm';
export type {
  PaymentMethod,
  AdditionalPaymentOption,
} from '../components/PaymentMethodSelector';

import type { PaymentInfo } from '../components';
import type { PersonalInfo } from '../components/PersonalInfoSection/interface';
import type { ShippingInfo } from '../components/ShippingInfoSection';

export interface CheckoutFormData {
  personalInfo: PersonalInfo;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
}

export interface CheckoutHandlers {
  onSubmit: (formData: CheckoutFormData) => void;
}
