export interface FilterItemProps {
  label: string;
  active: boolean;
  count: number;
  onToggle: () => void;
}
export type SearchWrapperProps = {
  Container: React.ComponentType<{ children?: React.ReactNode }>;
};
