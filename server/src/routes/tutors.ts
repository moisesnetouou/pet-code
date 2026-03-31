import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import {
  createTutorSchema,
  tutorParamsSchema,
  tutorQuerySchema,
  updateTutorSchema,
} from "../schemas/tutor.schema.js";
import { Tutors } from "../services/tutors.js";
import type {
  TutorBody,
  TutorParams,
  TutorQueryParams,
} from "../types/routes.js";

const tutors = new Tutors();

const paginatedTutorsResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          cpf: { type: "string" },
          phone: { type: "string" },
          email: { type: "string" },
          address: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
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

const tutorResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        cpf: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        address: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
      },
    },
  },
};

export async function tutorRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: TutorQueryParams }>(
    "/tutors",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            name: { type: "string" },
            cpf: { type: "string" },
            email: { type: "string" },
          },
        },
        response: {
          200: paginatedTutorsResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = tutorQuerySchema.parse({ query: request.query });
      const result = await tutors.findAll(parsed.query);
      return result;
    },
  );

  fastify.post<{ Body: TutorBody }>(
    "/tutors",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          201: tutorResponse,
        },
      },
    },
    async (request, reply) => {
      const parsed = createTutorSchema.parse({ body: request.body });
      const tutor = await tutors.create(parsed.body);
      return reply.status(201).send({ data: tutor });
    },
  );

  fastify.get<{ Params: TutorParams }>(
    "/tutors/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: tutorResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = tutorParamsSchema.parse({ params: request.params });
      const tutor = await tutors.findById(parsed.params.id);
      return { data: tutor };
    },
  );

  fastify.put<{ Params: TutorParams; Body: Partial<TutorBody> }>(
    "/tutors/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: tutorResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = updateTutorSchema.parse({
        body: request.body,
        params: request.params,
      });
      const tutor = await tutors.update(parsed.params.id, parsed.body);
      return { data: tutor };
    },
  );

  fastify.delete<{ Params: TutorParams }>(
    "/tutors/:id",
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
      const parsed = tutorParamsSchema.parse({ params: request.params });
      const result = await tutors.delete(parsed.params.id);
      return { data: result };
    },
  );
}
