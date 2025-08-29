import type { PersonalInfo } from '../components/PersonalInfoSection/interface';
import type { ShippingInfo } from '../components/ShippingInfoSection/interface';

export interface CheckoutFormData {
  personalInfo: PersonalInfo;
  shippingInfo: ShippingInfo;
}

export interface CheckoutHandlers {
  onSubmit: (formData: CheckoutFormData) => void;
}
