import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import scalar from "@scalar/fastify-api-reference";
import Fastify, {
  type FastifyReply,
  type FastifyRequest,
} from "fastify";

import { routes } from "./routes/index.js";

import { errorHandler } from "./utils/response.js";

export async function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.setErrorHandler(errorHandler);

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  const jwtPlugin = fastifyJwt as unknown as (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    opts: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    done: (err?: Error) => void,
  ) => void;
  await app.register(jwtPlugin, {
    secret: process.env.JWT_SECRET || "default-secret-change-in-production",
    sign: {
      expiresIn: "7d",
    },
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch {
        reply.status(401).send({ message: "Unauthorized" });
      }
    },
  );

  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "PetCode API",
        description: "API para sistema de gestão veterinária",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          ErrorResponse: {
            type: "object",
            properties: {
              error: { type: "string" },
              message: { type: "string" },
            },
          },
        },
        responses: {
          400: {
            description: "Bad Request - Dados inválidos ouMissing",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { error: "Bad Request", message: "Dados inválidos" },
              },
            },
          },
          401: {
            description: "Unauthorized - Token inválido ou expirado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { error: "Unauthorized", message: "Token inválido ou expirado" },
              },
            },
          },
          403: {
            description: "Forbidden - Sem permissão",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { error: "Forbidden", message: "Sem permissão para acessar este recurso" },
              },
            },
          },
          404: {
            description: "Not Found - Recurso não encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { error: "Not Found", message: "Recurso não encontrado" },
              },
            },
          },
          500: {
            description: "Internal Server Error - Erro interno do servidor",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorResponse" },
                example: { error: "Internal Server Error", message: "Erro interno do servidor" },
              },
            },
          },
        },
      },
    },
  });

  await app.register(scalar, {
    routePrefix: "/docs",
  });

  await app.register(routes);

  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  app.get("/openapi.json", async () => {
    return app.swagger();
  });

  return app;
}
