import { type Prisma, PrismaClient } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

const prisma = new PrismaClient();

export class Clinics {
  async create(data: {
    name: string;
    cnpj: string;
    phone?: string;
    email?: string;
    address?: string;
  }) {
    const existingClinic = await prisma.clinic.findUnique({
      where: { cnpj: data.cnpj },
    });

    if (existingClinic) {
      throw new Error("CNPJ já cadastrado");
    }

    const clinic = await prisma.clinic.create({
      data,
    });

    return clinic;
  }

  async findAll(query?: { page?: number; limit?: number; name?: string }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Prisma.ClinicWhereInput = {};

    if (query?.name) where.name = { contains: query.name };

    const [clinics, total] = await Promise.all([
      prisma.clinic.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.clinic.count({ where }),
    ]);

    return {
      data: clinics,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string) {
    const clinic = await prisma.clinic.findUnique({
      where: { id },
      include: {
        users: {
          select: { id: true, name: true, email: true, role: true },
        },
        _count: { select: { pets: true, appointments: true } },
      },
    });

    if (!clinic) {
      throw new Error("Clínica não encontrada");
    }

    return clinic;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      cnpj: string;
      phone: string;
      email: string;
      address: string;
    }>,
  ) {
    const clinic = await prisma.clinic.findUnique({ where: { id } });

    if (!clinic) {
      throw new Error("Clínica não encontrada");
    }

    if (data.cnpj && data.cnpj !== clinic.cnpj) {
      const existingCnpj = await prisma.clinic.findUnique({
        where: { cnpj: data.cnpj },
      });
      if (existingCnpj) {
        throw new Error("CNPJ já está em uso");
      }
    }

    return prisma.clinic.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const clinic = await prisma.clinic.findUnique({ where: { id } });

    if (!clinic) {
      throw new Error("Clínica não encontrada");
    }

    await prisma.clinic.delete({ where: { id } });

    return { message: "Clínica deletada com sucesso" };
  }
}
