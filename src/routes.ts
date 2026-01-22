import { FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.route";

export const registerRoutes = (app: FastifyInstance) => {
  app.register(authRoutes, { prefix: "/auth" });  
};
