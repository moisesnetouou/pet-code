import { type Prisma, PrismaClient } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

const prisma = new PrismaClient();

export class Appointments {
  async create(data: {
    dateTime: string;
    type: string;
    notes?: string;
    petId: string;
    clinicId: string;
    userId?: string;
  }) {
    const appointment = await prisma.appointment.create({
      data: {
        dateTime: new Date(data.dateTime),
        type: data.type,
        notes: data.notes || null,
        status: "AGENDADO",
        petId: data.petId,
        clinicId: data.clinicId,
        userId: data.userId || null,
      },
      include: {
        pet: { select: { id: true, name: true } },
        clinic: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
    });

    return appointment;
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    petId?: string;
    clinicId?: string;
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Prisma.AppointmentWhereInput = {};

    if (query?.petId) where.petId = query.petId;
    if (query?.clinicId) where.clinicId = query.clinicId;
    if (query?.status) where.status = query.status;
    if (query?.type) where.type = { contains: query.type };
    if (query?.dateFrom || query?.dateTo) {
      where.dateTime = {};
      if (query?.dateFrom) where.dateTime.gte = new Date(query.dateFrom);
      if (query?.dateTo) where.dateTime.lte = new Date(query.dateTo);
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          pet: { select: { id: true, name: true } },
          clinic: { select: { id: true, name: true } },
          user: { select: { id: true, name: true } },
        },
        orderBy: { dateTime: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.appointment.count({ where }),
    ]);

    return {
      data: appointments,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string) {
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        pet: true,
        clinic: true,
        user: true,
      },
    });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    return appointment;
  }

  async update(
    id: string,
    data: Partial<{
      dateTime: string;
      status: string;
      type: string;
      notes: string;
    }>,
  ) {
    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    const updateData: Prisma.AppointmentUpdateInput = {
      dateTime: data.dateTime ? new Date(data.dateTime) : undefined,
      status: data.status,
      type: data.type,
      notes: data.notes,
    };

    return prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        pet: { select: { id: true, name: true } },
        clinic: { select: { id: true, name: true } },
        user: { select: { id: true, name: true } },
      },
    });
  }

  async delete(id: string) {
    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) {
      throw new Error("Agendamento não encontrado");
    }

    await prisma.appointment.delete({ where: { id } });

    return { message: "Agendamento deletado com sucesso" };
  }
}

