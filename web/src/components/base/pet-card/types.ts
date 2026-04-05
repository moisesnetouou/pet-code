export type PetStatus = "ativo" | "inativo";

export interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  weight: string;
  tutor: string;
  status: PetStatus;
  lastVisit?: string;
  emoji?: string;
  onClick?: () => void;
  className?: string;
}
