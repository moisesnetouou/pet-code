import { z } from "zod";

export const createTutorSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    cpf: z.string().min(1, "CPF é obrigatório"),
    phone: z.string().min(1, "Telefone é obrigatório"),
    email: z.string().email("Email inválido").optional(),
    address: z.string().optional(),
  }),
});

export const updateTutorSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    cpf: z.string().min(1).optional(),
    phone: z.string().min(1).optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const tutorParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const tutorQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(100).optional(),
      name: z.string().optional(),
      cpf: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
});

export type CreateTutorInput = z.infer<typeof createTutorSchema>["body"];
export type UpdateTutorInput = z.infer<typeof updateTutorSchema>;
