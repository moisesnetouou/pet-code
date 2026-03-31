import { z } from "zod";

export const createPetSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    type: z.enum(["CACHORRO", "GATO", "PASSARO", "ROEDOR", "REPTIL", "OUTRO"]),
    breed: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    gender: z.string().optional(),
    weight: z.number().positive().optional(),
    color: z.string().optional(),
    photoUrl: z.string().url().optional(),
    notes: z.string().optional(),
    clinicId: z.string().uuid("ID da clínica é obrigatório"),
    tutorId: z.string().uuid().optional(),
    tutorUserId: z.string().uuid().optional(),
  }),
});

export const updatePetSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    type: z
      .enum(["CACHORRO", "GATO", "PASSARO", "ROEDOR", "REPTIL", "OUTRO"])
      .optional(),
    breed: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    gender: z.string().optional(),
    weight: z.number().positive().optional(),
    color: z.string().optional(),
    photoUrl: z.string().url().optional(),
    notes: z.string().optional(),
    tutorId: z.string().uuid().optional(),
    tutorUserId: z.string().uuid().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const petParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const petQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(100).optional(),
      clinicId: z.string().uuid().optional(),
      tutorId: z.string().uuid().optional(),
      type: z
        .enum(["CACHORRO", "GATO", "PASSARO", "ROEDOR", "REPTIL", "OUTRO"])
        .optional(),
      name: z.string().optional(),
      gender: z.string().optional(),
    })
    .optional(),
});

export type CreatePetInput = z.infer<typeof createPetSchema>["body"];
export type UpdatePetInput = z.infer<typeof updatePetSchema>;
