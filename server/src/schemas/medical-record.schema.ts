import { z } from "zod";

export const createMedicalRecordSchema = z.object({
  body: z.object({
    description: z.string().min(1, "Descrição é obrigatória"),
    diagnosis: z.string().optional(),
    notes: z.string().optional(),
    petId: z.string().uuid("ID do pet é obrigatório"),
  }),
});

export const updateMedicalRecordSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    diagnosis: z.string().optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const medicalRecordParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const medicalRecordQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(100).optional(),
      petId: z.string().uuid().optional(),
      dateFrom: z.string().datetime().optional(),
      dateTo: z.string().datetime().optional(),
    })
    .optional(),
});

export type CreateMedicalRecordInput = z.infer<
  typeof createMedicalRecordSchema
>["body"];
export type UpdateMedicalRecordInput = z.infer<
  typeof updateMedicalRecordSchema
>;
export type MedicalRecordQueryInput = z.infer<
  typeof medicalRecordQuerySchema
>["query"];
