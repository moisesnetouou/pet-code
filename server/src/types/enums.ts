import type { Role, PetType } from "@prisma/client";

export type { Role, PetType };

export const ROLE_VALUES = ["SUPER_ADMIN", "ADMIN", "VETERINARIO", "ATENDENTE", "TUTOR"] as const;
export type RoleValue = (typeof ROLE_VALUES)[number];

export const PET_TYPE_VALUES = ["CACHORRO", "GATO", "PASSARO", "ROEDOR", "REPTIL", "OUTRO"] as const;
export type PetTypeValue = (typeof PET_TYPE_VALUES)[number];
