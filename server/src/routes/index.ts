import type { FastifyInstance } from "fastify";
import { appointmentRoutes } from "./appointments.js";
import { authRoutes } from "./auth.js";
import { clinicRoutes } from "./clinics.js";
import { medicalRecordRoutes } from "./medical-records.js";
import { petRoutes } from "./pets.js";
import { tutorRoutes } from "./tutors.js";

export async function routes(fastify: FastifyInstance) {
  await fastify.register(authRoutes, { prefix: "/api" });
  await fastify.register(clinicRoutes, { prefix: "/api" });
  await fastify.register(petRoutes, { prefix: "/api" });
  await fastify.register(tutorRoutes, { prefix: "/api" });
  await fastify.register(appointmentRoutes, { prefix: "/api" });
  await fastify.register(medicalRecordRoutes, { prefix: "/api" });
}
