export interface Tutor {
  id: number;
  name: string;
  cpf?: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pets: string[];
  status: TutorStatus;
  createdAt: string;
  photoUrl?: string;
}

export type TutorStatus = "ativo" | "inativo";

export interface FilterOptions {
  search: string;
  status: TutorStatus | "all";
  sortBy: "name" | "recent" | "pets";
}
