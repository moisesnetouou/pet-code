import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import {
  clinicParamsSchema,
  clinicQuerySchema,
  createClinicSchema,
  updateClinicSchema,
} from "../schemas/clinic.schema.js";
import { Clinics } from "../services/clinics.js";
import type {
  ClinicBody,
  ClinicParams,
  ClinicQueryParams,
} from "../types/routes.js";

const clinics = new Clinics();

const paginatedClinicsResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          cnpj: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          address: { type: "string" },
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

const clinicResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        cnpj: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
  },
};

export async function clinicRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: ClinicQueryParams }>(
    "/clinics",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            name: { type: "string" },
          },
        },
        response: {
          200: paginatedClinicsResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = clinicQuerySchema.parse({ query: request.query });
      const result = await clinics.findAll(parsed.query);
      return result;
    },
  );

  fastify.post<{ Body: ClinicBody }>(
    "/clinics",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          201: clinicResponse,
        },
      },
    },
    async (request, reply) => {
      const parsed = createClinicSchema.parse({ body: request.body });
      const clinic = await clinics.create(parsed.body);
      return reply.status(201).send({ data: clinic });
    },
  );

  fastify.get<{ Params: ClinicParams }>(
    "/clinics/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: clinicResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = clinicParamsSchema.parse({ params: request.params });
      const clinic = await clinics.findById(parsed.params.id);
      return { data: clinic };
    },
  );

  fastify.put<{ Params: ClinicParams; Body: Partial<ClinicBody> }>(
    "/clinics/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: clinicResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = updateClinicSchema.parse({
        body: request.body,
        params: request.params,
      });
      const clinic = await clinics.update(parsed.params.id, parsed.body);
      return { data: clinic };
    },
  );

  fastify.delete<{ Params: ClinicParams }>(
    "/clinics/:id",
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
      const parsed = clinicParamsSchema.parse({ params: request.params });
      const result = await clinics.delete(parsed.params.id);
      return { data: result };
    },
  );
}
