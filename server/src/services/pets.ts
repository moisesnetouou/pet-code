import { type Prisma, PrismaClient, type PetType } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

import type { PetTypeValue } from "../types/enums.js";

const prisma = new PrismaClient();

export class Pets {
  async create(data: {
    name: string;
    type: PetTypeValue;
    breed?: string;
    birthDate?: string;
    gender?: string;
    weight?: number;
    color?: string;
    photoUrl?: string;
    notes?: string;
    clinicId: string;
    tutorId?: string;
    tutorUserId?: string;
  }) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        type: data.type as PetType,
        breed: data.breed,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        gender: data.gender,
        weight: data.weight,
        color: data.color,
        photoUrl: data.photoUrl,
        notes: data.notes,
        clinicId: data.clinicId,
        tutorId: data.tutorId || null,
        tutorUserId: data.tutorUserId || null,
      },
      include: {
        clinic: { select: { id: true, name: true } },
        tutor: true,
      },
    });

    return pet;
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    clinicId?: string;
    tutorId?: string;
    type?: PetTypeValue;
    name?: string;
    gender?: string;
  }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Prisma.PetWhereInput = {};

    if (query?.clinicId) where.clinicId = query.clinicId;
    if (query?.tutorId) where.tutorId = query.tutorId;
    if (query?.type) where.type = query.type as PetType;
    if (query?.name) where.name = { contains: query.name };
    if (query?.gender) where.gender = { equals: query.gender };

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        include: {
          clinic: { select: { id: true, name: true } },
          tutor: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.pet.count({ where }),
    ]);

    return {
      data: pets,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        clinic: true,
        tutor: true,
        tutorUser: { select: { id: true, name: true, email: true } },
        appointments: {
          orderBy: { dateTime: "desc" },
          take: 10,
        },
        medicalRecords: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!pet) {
      throw new Error("Pet não encontrado");
    }

    return pet;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      type: PetTypeValue;
      breed: string;
      birthDate: string;
      gender: string;
      weight: number;
      color: string;
      photoUrl: string;
      notes: string;
      tutorId: string;
      tutorUserId: string;
    }>,
  ) {
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (!pet) {
      throw new Error("Pet não encontrado");
    }

    const updateData: Prisma.PetUpdateInput = {
      name: data.name,
      type: data.type as PetType,
      breed: data.breed,
      birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
      gender: data.gender,
      weight: data.weight,
      color: data.color,
      photoUrl: data.photoUrl,
      notes: data.notes,
      tutor: data.tutorId ? { connect: { id: data.tutorId } } : undefined,
      tutorUser: data.tutorUserId
        ? { connect: { id: data.tutorUserId } }
        : undefined,
    };

    return prisma.pet.update({
      where: { id },
      data: updateData,
      include: {
        clinic: { select: { id: true, name: true } },
        tutor: true,
      },
    });
  }

  async delete(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } });

    if (!pet) {
      throw new Error("Pet não encontrado");
    }

    await prisma.pet.delete({ where: { id } });

    return { message: "Pet deletado com sucesso" };
  }
}
