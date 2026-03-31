import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export type ApiResponse<T = unknown> = {
  data?: T;
  message?: string;
  error?: string;
};

export function success<T>(data: T, message = "Success") {
  return { data, message };
}

export function error(message: string) {
  return { error: message };
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error);

  const statusCode = error.statusCode || 500;

  return reply.status(statusCode).send({
    error: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
}
