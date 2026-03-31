import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import {
  appointmentParamsSchema,
  appointmentQuerySchema,
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../schemas/appointment.schema.js";
import { Appointments } from "../services/appointments.js";
import type {
  AppointmentBody,
  AppointmentParams,
  AppointmentQueryParams,
} from "../types/routes.js";
import { getJwtUser } from "../utils/jwt.js";

const appointments = new Appointments();

const paginatedAppointmentsResponse = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          dateTime: { type: "string", format: "date-time" },
          type: { type: "string" },
          status: { type: "string" },
          notes: { type: "string" },
          petId: { type: "string", format: "uuid" },
          clinicId: { type: "string", format: "uuid" },
          userId: { type: "string", format: "uuid" },
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

const appointmentResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "string", format: "uuid" },
        dateTime: { type: "string", format: "date-time" },
        type: { type: "string" },
        status: { type: "string" },
        notes: { type: "string" },
        petId: { type: "string", format: "uuid" },
        clinicId: { type: "string", format: "uuid" },
        userId: { type: "string", format: "uuid" },
      },
    },
  },
};

export async function appointmentRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: AppointmentQueryParams }>(
    "/appointments",
    {
      preHandler: [authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            page: { type: "integer", minimum: 1, default: 1 },
            limit: { type: "integer", minimum: 1, maximum: 100, default: 20 },
            petId: { type: "string", format: "uuid" },
            clinicId: { type: "string", format: "uuid" },
            status: {
              type: "string",
              enum: ["AGENDADO", "CONFIRMADO", "REALIZADO", "CANCELADO"],
            },
            type: { type: "string" },
            dateFrom: { type: "string", format: "date-time" },
            dateTo: { type: "string", format: "date-time" },
          },
        },
        response: {
          200: paginatedAppointmentsResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = appointmentQuerySchema.parse({ query: request.query });
      const result = await appointments.findAll(parsed.query);
      return result;
    },
  );

  fastify.post<{ Body: AppointmentBody }>(
    "/appointments",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          201: appointmentResponse,
        },
      },
    },
    async (request, reply) => {
      const parsed = createAppointmentSchema.parse({ body: request.body });
      const appointment = await appointments.create({
        ...parsed.body,
        userId: getJwtUser(request)?.id,
      });
      return reply.status(201).send({ data: appointment });
    },
  );

  fastify.get<{ Params: AppointmentParams }>(
    "/appointments/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: appointmentResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = appointmentParamsSchema.parse({ params: request.params });
      const appointment = await appointments.findById(parsed.params.id);
      return { data: appointment };
    },
  );

  fastify.put<{ Params: AppointmentParams; Body: Partial<AppointmentBody> }>(
    "/appointments/:id",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: appointmentResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = updateAppointmentSchema.parse({
        body: request.body,
        params: request.params,
      });
      const appointment = await appointments.update(
        parsed.params.id,
        parsed.body,
      );
      return { data: appointment };
    },
  );

  fastify.delete<{ Params: AppointmentParams }>(
    "/appointments/:id",
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
      const parsed = appointmentParamsSchema.parse({ params: request.params });
      const result = await appointments.delete(parsed.params.id);
      return { data: result };
    },
  );
}
