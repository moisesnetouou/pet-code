import { type Prisma, PrismaClient } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

const prisma = new PrismaClient();

export class Tutors {
  async create(data: {
    name: string;
    cpf: string;
    phone: string;
    email?: string;
    address?: string;
  }) {
    const existingTutor = await prisma.tutor.findUnique({
      where: { cpf: data.cpf },
    });

    if (existingTutor) {
      throw new Error("CPF já cadastrado");
    }

    const tutor = await prisma.tutor.create({
      data,
      include: {
        _count: { select: { pets: true } },
      },
    });

    return tutor;
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    name?: string;
    cpf?: string;
    email?: string;
  }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Prisma.TutorWhereInput = {};

    if (query?.name) where.name = { contains: query.name };
    if (query?.cpf) where.cpf = { contains: query.cpf };
    if (query?.email) where.email = { contains: query.email };

    const [tutors, total] = await Promise.all([
      prisma.tutor.findMany({
        where,
        include: {
          _count: { select: { pets: true } },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.tutor.count({ where }),
    ]);

    return {
      data: tutors,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string) {
    const tutor = await prisma.tutor.findUnique({
      where: { id },
      include: {
        pets: {
          include: {
            clinic: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!tutor) {
      throw new Error("Tutor não encontrado");
    }

    return tutor;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      cpf: string;
      phone: string;
      email: string;
      address: string;
    }>,
  ) {
    const tutor = await prisma.tutor.findUnique({ where: { id } });

    if (!tutor) {
      throw new Error("Tutor não encontrado");
    }

    if (data.cpf && data.cpf !== tutor.cpf) {
      const existingCpf = await prisma.tutor.findUnique({
        where: { cpf: data.cpf },
      });
      if (existingCpf) {
        throw new Error("CPF já está em uso");
      }
    }

    return prisma.tutor.update({
      where: { id },
      data,
      include: {
        _count: { select: { pets: true } },
      },
    });
  }

  async delete(id: string) {
    const tutor = await prisma.tutor.findUnique({ where: { id } });

    if (!tutor) {
      throw new Error("Tutor não encontrado");
    }

    await prisma.tutor.delete({ where: { id } });

    return { message: "Tutor deletado com sucesso" };
  }
}
