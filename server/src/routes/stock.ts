import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import { Stock } from "../services/stock.js";

type StockType = "MEDICAMENTO" | "RACAO" | "BRINQUEDO" | "VACINA" | "MATERIAL" | "OUTRO";

const stock = new Stock();

const paginatedStockResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string" },
          imageUrl: { type: "string" },
          quantity: { type: "integer" },
          unit: { type: "string" },
          minQuantity: { type: "integer" },
          type: { type: "string" },
          clinicId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    pagination: {
      type: "object",
      properties: {
        page: { type: "integer" },
        limit: { type: "integer" },
        total: { type: "integer" },
        totalPages: { type: "integer" },
      },
    },
  },
};

const stockResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        description: { type: "string" },
        imageUrl: { type: "string" },
        quantity: { type: "integer" },
        unit: { type: "string" },
        minQuantity: { type: "integer" },
        type: { type: "string" },
        clinicId: { type: "string", format: "uuid" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};

interface StockBody {
  name: string;
  description?: string;
  imageUrl?: string;
  quantity: number;
  unit?: string;
  minQuantity: number;
  type?: StockType;
  clinicId: string;
}

interface StockParams {
  id: string;
}

interface StockQueryParams {
  page?: number;
  limit?: number;
  clinicId?: string;
  search?: string;
  type?: StockType;
  lowStock?: boolean;
}

export async function stockRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: StockQueryParams }>(
    "/stock",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            clinicId: { type: "string", format: "uuid" },
            search: { type: "string" },
            type: { 
              type: "string",
              enum: ["MEDICAMENTO", "RACAO", "BRINQUEDO", "VACINA", "MATERIAL", "OUTRO"],
            },
            lowStock: { type: "boolean" },
          },
        },
        response: {
          200: paginatedStockResponse,
        },
      },
    },
    async (request, _reply) => {
      const result = await stock.findAll(request.query);
      return result;
    },
  );

  fastify.post<{ Body: StockBody }>(
    "/stock",
    {
      preHandler: [authenticate],
      schema: {
        body: {
          type: "object",
          required: ["name", "quantity", "minQuantity", "clinicId"],
          properties: {
            name: { type: "string", minLength: 1 },
            description: { type: "string" },
            imageUrl: { type: "string" },
            quantity: { type: "integer", minimum: 0 },
            unit: { type: "string" },
            minQuantity: { type: "integer", minimum: 0 },
            type: { 
              type: "string",
              enum: ["MEDICAMENTO", "RACAO", "BRINQUEDO", "VACINA", "MATERIAL", "OUTRO"],
            },
            clinicId: { type: "string", format: "uuid" },
          },
        },
        response: {
          201: stockResponse,
        },
      },
    },
    async (request, reply) => {
      const item = await stock.create(request.body);
      return reply.status(201).send({ data: item });
    },
  );

  fastify.get<{ Params: StockParams }>(
    "/stock/:id",
    {
      preHandler: [authenticate],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        response: {
          200: stockResponse,
        },
      },
    },
    async (request, _reply) => {
      const item = await stock.findById(request.params.id);
      return { data: item };
    },
  );

  fastify.put<{ Params: StockParams; Body: Partial<StockBody> }>(
    "/stock/:id",
    {
      preHandler: [authenticate],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            imageUrl: { type: "string" },
            quantity: { type: "integer", minimum: 0 },
            unit: { type: "string" },
            minQuantity: { type: "integer", minimum: 0 },
            type: { 
              type: "string",
              enum: ["MEDICAMENTO", "RACAO", "BRINQUEDO", "VACINA", "MATERIAL", "OUTRO"],
            },
          },
        },
        response: {
          200: stockResponse,
        },
      },
    },
    async (request, _reply) => {
      const item = await stock.update(request.params.id, request.body);
      return { data: item };
    },
  );

  fastify.delete<{ Params: StockParams }>(
    "/stock/:id",
    {
      preHandler: [authenticate],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    async (request, _reply) => {
      const result = await stock.delete(request.params.id);
      return { data: result };
    },
  );

  fastify.patch<{ Params: StockParams; Body: { quantity: number } }>(
    "/stock/:id/quantity",
    {
      preHandler: [authenticate],
      schema: {
        params: {
          type: "object",
          properties: {
            id: { type: "string", format: "uuid" },
          },
        },
        body: {
          type: "object",
          required: ["quantity"],
          properties: {
            quantity: { type: "integer", minimum: 0 },
          },
        },
        response: {
          200: stockResponse,
        },
      },
    },
    async (request, _reply) => {
      const item = await stock.updateQuantity(
        request.params.id,
        request.body.quantity,
      );
      return { data: item };
    },
  );
}