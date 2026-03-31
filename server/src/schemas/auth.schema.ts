import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    name: z.string().min(1, "Nome é obrigatório"),
    role: z.enum(["ADMIN", "VETERINARIO", "ATENDENTE", "TUTOR"]).optional(),
    clinicId: z.string().uuid().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "Senha é obrigatória"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
