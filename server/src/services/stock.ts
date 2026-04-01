import { PrismaClient, type Stock as StockModel, type StockType } from "@prisma/client";
import {
  calculatePagination,
  getOffset,
  getPaginationParams,
} from "../utils/pagination.js";

const prisma = new PrismaClient();

export class Stock {
  async create(data: {
    name: string;
    description?: string;
    imageUrl?: string;
    quantity: number;
    unit?: string;
    minQuantity: number;
    type?: StockType;
    clinicId: string;
  }): Promise<StockModel> {
    return prisma.stock.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        quantity: data.quantity,
        unit: data.unit,
        minQuantity: data.minQuantity,
        type: data.type || "OUTRO",
        clinicId: data.clinicId,
      },
    });
  }

  async findAll(query?: {
    page?: number;
    limit?: number;
    clinicId?: string;
    search?: string;
    type?: string;
    lowStock?: boolean;
  }) {
    const { page, limit } = getPaginationParams({
      page: query?.page,
      limit: query?.limit,
    });
    const offset = getOffset(page, limit);

    const where: Record<string, unknown> = {};

    if (query?.clinicId) where.clinicId = query.clinicId;
    if (query?.search) where.name = { contains: query.search };
    if (query?.type) where.type = query.type as StockType;
    
    const allItems = await prisma.stock.findMany({
      where,
      orderBy: { name: "asc" },
    });

    let items = allItems;
    if (query?.lowStock === true) {
      items = allItems.filter(item => item.quantity <= item.minQuantity);
    }

    const total = items.length;
    items = items.slice(offset, offset + limit);

    return {
      data: items,
      pagination: calculatePagination(total, page, limit),
    };
  }

  async findById(id: string): Promise<StockModel> {
    const item = await prisma.stock.findUnique({
      where: { id },
    });

    if (!item) {
      throw new Error("Item não encontrado");
    }

    return item;
  }

  async update(
    id: string,
    data: Partial<{
      name: string;
      description: string;
      imageUrl: string;
      quantity: number;
      unit: string;
      minQuantity: number;
      type: StockType;
    }>,
  ): Promise<StockModel> {
    const item = await prisma.stock.findUnique({ where: { id } });

    if (!item) {
      throw new Error("Item não encontrado");
    }

    return prisma.stock.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        quantity: data.quantity,
        unit: data.unit,
        minQuantity: data.minQuantity,
        type: data.type,
      },
    });
  }

  async delete(id: string): Promise<{ message: string }> {
    const item = await prisma.stock.findUnique({ where: { id } });

    if (!item) {
      throw new Error("Item não encontrado");
    }

    await prisma.stock.delete({ where: { id } });

    return { message: "Item deletado com sucesso" };
  }

  async updateQuantity(id: string, quantity: number): Promise<StockModel> {
    const item = await prisma.stock.findUnique({ where: { id } });

    if (!item) {
      throw new Error("Item não encontrado");
    }

    return prisma.stock.update({
      where: { id },
      data: { quantity },
    });
  }
}