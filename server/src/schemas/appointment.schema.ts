import { z } from "zod";

export const createAppointmentSchema = z.object({
  body: z.object({
    dateTime: z.string().datetime("Data/hora inválida"),
    type: z.string().min(1, "Tipo é obrigatório"),
    notes: z.string().optional(),
    petId: z.string().uuid("ID do pet é obrigatório"),
    clinicId: z.string().uuid("ID da clínica é obrigatório"),
    userId: z.string().uuid().optional(),
  }),
});

export const updateAppointmentSchema = z.object({
  body: z.object({
    dateTime: z.string().datetime().optional(),
    status: z
      .enum(["AGENDADO", "CONFIRMADO", "REALIZADO", "CANCELADO"])
      .optional(),
    type: z.string().optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const appointmentParamsSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const appointmentQuerySchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).max(100).optional(),
      petId: z.string().uuid().optional(),
      clinicId: z.string().uuid().optional(),
      status: z
        .enum(["AGENDADO", "CONFIRMADO", "REALIZADO", "CANCELADO"])
        .optional(),
      type: z.string().optional(),
      dateFrom: z.string().datetime().optional(),
      dateTo: z.string().datetime().optional(),
    })
    .optional(),
});

export type CreateAppointmentInput = z.infer<
  typeof createAppointmentSchema
>["body"];
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
export type AppointmentQueryInput = z.infer<
  typeof appointmentQuerySchema
>["query"];
