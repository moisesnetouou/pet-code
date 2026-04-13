export type PetStatus = "ativo" | "inativo";

export interface PetCardProps {
  name: string;
  breed: string;
  age: string;
  weight: string;
  tutor: string;
  status: PetStatus;
  type?: string;
  lastVisit?: string;
  emoji?: string;
  photoUrl?: string;
  onClick?: () => void;
  className?: string;
}
