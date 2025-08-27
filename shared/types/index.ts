import type { Session } from 'next-auth';
import type { SessionContextValue } from 'next-auth/react';

export type OptionItem = {
  value: string;
  label: string;
};

export type AllOptionsProps = {
  colors: OptionItem[];
  genders: OptionItem[];
  brands: OptionItem[];
  categories: OptionItem[];
  sizes: OptionItem[];
};

export interface UseUserProps {
  session: Session | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isLoading: boolean;
  isAuthenticated: boolean;
  update: SessionContextValue['update'];
}
