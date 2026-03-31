import type { FastifyReply, FastifyRequest } from "fastify";

import { getJwtUser } from "../utils/jwt.js";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (_err) {
    reply.status(401).send({ error: "Unauthorized" });
  }
}

export async function requireRole(allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = getJwtUser(request);
    if (!user) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(user.role)) {
      return reply.status(403).send({ error: "Forbidden" });
    }
  };
}
