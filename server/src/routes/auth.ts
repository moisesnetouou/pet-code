import type { FastifyInstance } from "fastify";
import { authenticate } from "../middleware/auth.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { Auth } from "../services/auth.js";
import { getJwtUser } from "../utils/jwt.js";

const auth = new Auth();

const userResponse = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    name: { type: "string" },
    role: { type: "string" },
    clinicId: { type: "string", format: "uuid" },
  },
};

const loginResponse = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        user: userResponse,
        token: { type: "string" },
      },
    },
  },
};

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/auth/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password", "name"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 6 },
            name: { type: "string", minLength: 1 },
            role: {
              type: "string",
              enum: ["ADMIN", "VETERINARIO", "ATENDENTE", "TUTOR"],
            },
            clinicId: { type: "string", format: "uuid" },
          },
        },
        response: {
          201: {
            type: "object",
            properties: {
              data: userResponse,
            },
          },
        },
      },
    },
    async (request, reply) => {
      const parsed = registerSchema.parse({ body: request.body });
      const user = await auth.register(parsed.body);
      return reply.status(201).send({ data: user });
    },
  );

  fastify.post(
    "/auth/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },
        response: {
          200: loginResponse,
        },
      },
    },
    async (request, _reply) => {
      const parsed = loginSchema.parse({ body: request.body });
      const user = await auth.login(
        parsed.body.email,
        parsed.body.password,
      );

      const token = fastify.jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        clinicId: user.clinicId,
      });

      return { data: { user, token } };
    },
  );

  fastify.get(
    "/auth/me",
    {
      preHandler: [authenticate],
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              data: userResponse,
            },
          },
        },
      },
    },
    async (request, _reply) => {
      const userId = getJwtUser(request)?.id;
      if (!userId) {
        return { error: "Unauthorized" };
      }
      const user = await auth.getProfile(userId);
      return { data: user };
    },
  );
}
