export interface PersonalInfo {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}
