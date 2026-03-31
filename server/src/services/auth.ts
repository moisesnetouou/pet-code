import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import type { RoleValue } from "../types/enums.js";

const prisma = new PrismaClient();

export class Auth {
  async register(data: {
    email: string;
    password: string;
    name: string;
    role?: RoleValue;
    clinicId?: string;
  }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role || "ATENDENTE",
        clinicId: data.clinicId || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        clinicId: true,
        createdAt: true,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        clinic: true,
      },
    });

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);

    if (!validPassword) {
      throw new Error("Credenciais inválidas");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clinicId: user.clinicId,
      clinic: user.clinic,
    };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clinic: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      clinicId: user.clinicId,
      clinic: user.clinic,
    };
  }
}
