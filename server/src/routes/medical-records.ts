import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import {
  createMedicalRecordSchema,
  medicalRecordParamsSchema,
  medicalRecordQuerySchema,
  updateMedicalRecordSchema,
} from "../schemas/medical-record.schema.js";
import { MedicalRecords } from "../services/medical-records.js";
import type {
  MedicalRecordBody,
  MedicalRecordParams,
  MedicalRecordQueryParams,
} from "../types/routes.js";

const medicalRecords = new MedicalRecords();

const paginatedMedicalRecordsResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          description: { type: "string" },
          diagnosis: { type: "string" },
          notes: { type: "string" },
          petId: { type: "string", format: "uuid" },
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

const medicalRecordResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        description: { type: "string" },
        diagnosis: { type: "string" },
        notes: { type: "string" },
        petId: { type: "string", format: "uuid" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};

export async function medicalRecordRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: MedicalRecordQueryParams }>(
    "/medical-records",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            petId: { type: "string", format: "uuid" },
            dateFrom: { type: "string", format: "date-time" },
            dateTo: { type: "string", format: "date-time" },
          },
        },
        response: {
          200: paginatedMedicalRecordsResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = medicalRecordQuerySchema.parse({ query: request.query });
      const result = await medicalRecords.findAll(parsed.query);
      return result;
    },
  );

  fastify.post<{ Body: MedicalRecordBody }>(
    "/medical-records",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          201: medicalRecordResponse,
        },
      },
    },
    async (request, reply) => {
      const parsed = createMedicalRecordSchema.parse({ body: request.body });
      const record = await medicalRecords.create(parsed.body);
      return reply.status(201).send({ data: record });
    },
  );

  fastify.get<{ Params: MedicalRecordParams }>(
    "/medical-records/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: medicalRecordResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = medicalRecordParamsSchema.parse({
        params: request.params,
      });
      const record = await medicalRecords.findById(parsed.params.id);
      return { data: record };
    },
  );

  fastify.put<{
    Params: MedicalRecordParams;
    Body: Partial<MedicalRecordBody>;
  }>(
    "/medical-records/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: medicalRecordResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = updateMedicalRecordSchema.parse({
        body: request.body,
        params: request.params,
      });
      const record = await medicalRecords.update(
        parsed.params.id,
        parsed.body,
      );
      return { data: record };
    },
  );

  fastify.delete<{ Params: MedicalRecordParams }>(
    "/medical-records/:id",
    {
      preHandler: [authenticate],
      schema: {
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
      const parsed = medicalRecordParamsSchema.parse({
        params: request.params,
      });
      const result = await medicalRecords.delete(parsed.params.id);
      return { data: result };
    },
  );
}
