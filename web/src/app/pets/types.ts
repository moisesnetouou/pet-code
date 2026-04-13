export interface Pet {
  id: number;
  name: string;
  type: PetType;
  breed: string;
  age: string;
  weight: string;
  emoji: string;
  color: string;
  tutor: string;
  tutorPhone: string;
  birthDate?: string;
  gender?: string;
  lastVisit?: string;
  nextVisit?: string;
  status: PetStatus;
  notes?: string;
  photoUrl?: string;
}

export type PetType =
  | "Cachorro"
  | "Gato"
  | "Pássaro"
  | "Peixe"
  | "Coelho"
  | "Jabuti"
  | "Outro";

export type PetStatus = "ativo" | "inativo";

export interface FilterOptions {
  search: string;
  type: PetType | "all";
  status: PetStatus | "all";
  sortBy: "name" | "recent" | "type";
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
