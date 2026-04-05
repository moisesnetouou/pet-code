export interface TextareaProps {
  label?: string;
  error?: string;
  helperText?: string;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}
