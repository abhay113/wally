import { FastifyReply, FastifyRequest } from "fastify";
import { getAdminToken, createUser, loginUser } from "./auth.service";

export const register = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { email, password } = req.body;

  const token = await getAdminToken();
  await createUser(token, email, password);

  return reply.code(201).send({
    message: "User registered successfully",
  });
};

export const login = async (
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const data = await loginUser(req.body.email, req.body.password);
  return reply.send(data);
};
