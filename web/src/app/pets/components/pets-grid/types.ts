import type { Pet } from "../../types";

export interface PetsGridProps {
  pets: Pet[];
  onPetClick?: (pet: Pet) => void;
  onEdit?: (pet: Pet) => void;
}
