export interface MenuItem {
  label: string;
  icon: React.ComponentType<{ color?: string }>;
  href?: string;
  onClick?: () => void;
}
