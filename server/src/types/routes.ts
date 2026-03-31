export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PetQueryParams = PaginationParams & {
  clinicId?: string;
  tutorId?: string;
  type?: "CACHORRO" | "GATO" | "PASSARO" | "ROEDOR" | "REPTIL" | "OUTRO";
  name?: string;
  gender?: string;
};

export type PetParams = {
  id: string;
};

export type PetBody = {
  name: string;
  type: "CACHORRO" | "GATO" | "PASSARO" | "ROEDOR" | "REPTIL" | "OUTRO";
  breed?: string;
  birthDate?: string;
  gender?: string;
  weight?: number;
  color?: string;
  photoUrl?: string;
  notes?: string;
  clinicId: string;
  tutorId?: string;
  tutorUserId?: string;
};

export type TutorQueryParams = PaginationParams & {
  name?: string;
  cpf?: string;
  email?: string;
};

export type TutorParams = {
  id: string;
};

export type TutorBody = {
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  address?: string;
};

export type ClinicQueryParams = PaginationParams & {
  name?: string;
};

export type ClinicParams = {
  id: string;
};

export type ClinicBody = {
  name: string;
  cnpj: string;
  phone?: string;
  email?: string;
  address?: string;
};

export type AppointmentQueryParams = PaginationParams & {
  petId?: string;
  clinicId?: string;
  status?: "AGENDADO" | "CONFIRMADO" | "REALIZADO" | "CANCELADO";
  type?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type AppointmentParams = {
  id: string;
};

export type AppointmentBody = {
  dateTime: string;
  type: string;
  notes?: string;
  petId: string;
  clinicId: string;
  userId?: string;
};

export type MedicalRecordQueryParams = PaginationParams & {
  petId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type MedicalRecordParams = {
  id: string;
};

export type MedicalRecordBody = {
  description: string;
  diagnosis?: string;
  notes?: string;
  petId: string;
};

export type AuthBody = {
  email: string;
  password: string;
  name?: string;
  role?: "ADMIN" | "VETERINARIO" | "ATENDENTE" | "TUTOR";
  clinicId?: string;
};

export type EmptyParams = Record<string, never>;
export type EmptyBody = Record<string, never>;
export type EmptyQuery = Record<string, never>;
