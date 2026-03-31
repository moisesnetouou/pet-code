import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import {
  createPetSchema,
  petParamsSchema,
  petQuerySchema,
  updatePetSchema,
} from "../schemas/pet.schema.js";
import { Pets } from "../services/pets.js";
import type { PetBody, PetParams, PetQueryParams } from "../types/routes.js";

const pets = new Pets();

const paginatedPetsResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          type: { type: "string" },
          breed: { type: "string" },
          birthDate: { type: "string", format: "date-time" },
          gender: { type: "string" },
          weight: { type: "number" },
          color: { type: "string" },
          photoUrl: { type: "string" },
          notes: { type: "string" },
          clinicId: { type: "string", format: "uuid" },
          tutorId: { type: "string", format: "uuid" },
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

const petResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        type: { type: "string" },
        breed: { type: "string" },
        birthDate: { type: "string", format: "date-time" },
        gender: { type: "string" },
        weight: { type: "number" },
        color: { type: "string" },
        photoUrl: { type: "string" },
        notes: { type: "string" },
        clinicId: { type: "string", format: "uuid" },
        tutorId: { type: "string", format: "uuid" },
      },
    },
  },
};

export async function petRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: PetQueryParams }>(
    "/pets",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            clinicId: { type: "string", format: "uuid" },
            tutorId: { type: "string", format: "uuid" },
            type: {
              type: "string",
              enum: [
                "CACHORRO",
                "GATO",
                "PASSARO",
                "ROEDOR",
                "REPTIL",
                "OUTRO",
              ],
            },
            name: { type: "string" },
            gender: { type: "string" },
          },
        },
        response: {
          200: paginatedPetsResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = petQuerySchema.parse({ query: request.query });
      const result = await pets.findAll(parsed.query);
      return result;
    },
  );

  fastify.post<{ Body: PetBody }>(
    "/pets",
    {
      preHandler: [authenticate],
      schema: {
        body: {
          type: "object",
          required: ["name", "type", "clinicId"],
          properties: {
            name: { type: "string", minLength: 1 },
            type: {
              type: "string",
              enum: [
                "CACHORRO",
                "GATO",
                "PASSARO",
                "ROEDOR",
                "REPTIL",
                "OUTRO",
              ],
            },
            breed: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            gender: { type: "string" },
            weight: { type: "number" },
            color: { type: "string" },
            photoUrl: { type: "string", format: "uri" },
            notes: { type: "string" },
            clinicId: { type: "string", format: "uuid" },
            tutorId: { type: "string", format: "uuid" },
            tutorUserId: { type: "string", format: "uuid" },
          },
        },
        response: {
          201: petResponse,
        },
      },
    },
    async (request, reply) => {
      const parsed = createPetSchema.parse({ body: request.body });
      const pet = await pets.create(parsed.body);
      return reply.status(201).send({ data: pet });
    },
  );

  fastify.get<{ Params: PetParams }>(
    "/pets/:id",
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
          200: petResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = petParamsSchema.parse({ params: request.params });
      const pet = await pets.findById(parsed.params.id);
      return { data: pet };
    },
  );

  fastify.put<{ Params: PetParams; Body: Partial<PetBody> }>(
    "/pets/:id",
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
            type: {
              type: "string",
              enum: [
                "CACHORRO",
                "GATO",
                "PASSARO",
                "ROEDOR",
                "REPTIL",
                "OUTRO",
              ],
            },
            breed: { type: "string" },
            birthDate: { type: "string", format: "date-time" },
            gender: { type: "string" },
            weight: { type: "number" },
            color: { type: "string" },
            photoUrl: { type: "string", format: "uri" },
            notes: { type: "string" },
            tutorId: { type: "string", format: "uuid" },
            tutorUserId: { type: "string", format: "uuid" },
          },
        },
        response: {
          200: petResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = updatePetSchema.parse({
        body: request.body,
        params: request.params,
      });
      const pet = await pets.update(parsed.params.id, parsed.body);
      return { data: pet };
    },
  );

  fastify.delete<{ Params: PetParams }>(
    "/pets/:id",
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
      const parsed = petParamsSchema.parse({ params: request.params });
      const result = await pets.delete(parsed.params.id);
      return { data: result };
    },
  );
}
