import type { FastifyRequest } from "fastify";

export interface JwtUser {
  id: string;
  email: string;
  name: string;
  role: string;
  clinicId?: string;
}

export function getJwtUser(request: FastifyRequest): JwtUser | undefined {
  return request.user as JwtUser | undefined;
}
