export interface PersonalInfo {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface PersonalInfoSectionProps {
  personalInfo: PersonalInfo;
  personalErrors: Record<string, string>;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}
