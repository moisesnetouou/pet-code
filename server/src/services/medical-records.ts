import { type Prisma, PrismaClient } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

const prisma = new PrismaClient();

export class MedicalRecords {
  async create(data: {
    description: string;
    diagnosis?: string;
    notes?: string;
    petId: string;
  }) {
    const medicalRecord = await prisma.medicalRecord.create({
      data: {
        description: data.description,
        diagnosis: data.diagnosis || null,
        notes: data.notes || null,
        petId: data.petId,
      },
      include: {
        pet: { select: { id: true, name: true } },
        prescriptions: true,
      },
    });

    return medicalRecord;
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    petId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Prisma.MedicalRecordWhereInput = {};

    if (query?.petId) where.petId = query.petId;
    if (query?.dateFrom || query?.dateTo) {
      where.createdAt = {};
      if (query?.dateFrom) where.createdAt.gte = new Date(query.dateFrom);
      if (query?.dateTo) where.createdAt.lte = new Date(query.dateTo);
    }

    const [records, total] = await Promise.all([
      prisma.medicalRecord.findMany({
        where,
        include: {
          pet: { select: { id: true, name: true } },
          prescriptions: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.medicalRecord.count({ where }),
    ]);

    return {
      data: records,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string) {
    const record = await prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        pet: true,
        prescriptions: true,
      },
    });

    if (!record) {
      throw new Error("Prontuário não encontrado");
    }

    return record;
  }

  async update(
    id: string,
    data: Partial<{
      description: string;
      diagnosis: string;
      notes: string;
    }>,
  ) {
    const record = await prisma.medicalRecord.findUnique({ where: { id } });

    if (!record) {
      throw new Error("Prontuário não encontrado");
    }

    return prisma.medicalRecord.update({
      where: { id },
      data: {
        description: data.description,
        diagnosis: data.diagnosis,
        notes: data.notes,
      },
      include: {
        pet: { select: { id: true, name: true } },
        prescriptions: true,
      },
    });
  }

  async delete(id: string) {
    const record = await prisma.medicalRecord.findUnique({ where: { id } });

    if (!record) {
      throw new Error("Prontuário não encontrado");
    }

    await prisma.medicalRecord.delete({ where: { id } });

    return { message: "Prontuário deletado com sucesso" };
  }
}
