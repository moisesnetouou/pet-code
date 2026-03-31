import { z } from "zod";

export const createClinicSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    cnpj: z.string().min(1, "CNPJ é obrigatório"),
    phone: z.string().optional(),
    email: z.string().email("Email inválido").optional(),
    address: z.string().optional(),
  }),
});

export const updateClinicSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    cnpj: z.string().min(1).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const clinicParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const clinicQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(100).optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export type CreateClinicInput = z.infer<typeof createClinicSchema>["body"];
export type UpdateClinicInput = z.infer<typeof updateClinicSchema>;
export type ClinicQueryInput = z.infer<typeof clinicQuerySchema>["query"];
