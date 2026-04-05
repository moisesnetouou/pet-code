export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  groups?: SelectGroup[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}
