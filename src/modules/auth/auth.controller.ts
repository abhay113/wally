import { FastifyReply, FastifyRequest } from "fastify";
import {
  getAdminToken,
  createUser,
  getUserIdByEmail,
  assignUserToGroup,
  sendVerificationEmail,
} from "./auth.service";

type RegisterBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const register = async (
  req: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const adminToken = await getAdminToken();

    await createUser(adminToken, email, password, firstName, lastName);

    const userId = await getUserIdByEmail(adminToken, email);

    await assignUserToGroup(adminToken, userId);

    await sendVerificationEmail(adminToken, userId);

    return reply.code(201).send({
      message: "Registration successful. Please verify your email.",
    });
  } catch (err: any) {
    return reply.code(400).send({
      error: "Registration failed",
      details: err.response?.data || err.message,
    });
  }
};
