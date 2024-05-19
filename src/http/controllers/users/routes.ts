import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', register)
  app.post('/user/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Authenticated //
  app.get('/user/me', { onRequest: [verifyJWT] }, profile)
}