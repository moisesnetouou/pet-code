import type { Veterinarian } from "../../types";

export type { Veterinarian };

export interface VeterinariansProps {
  veterinarians: Veterinarian[];
  onToggle?: (id: number) => void;
}
