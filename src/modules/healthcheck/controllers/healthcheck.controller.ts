import { FastifyReply, FastifyRequest } from "fastify";

export const healthcheck = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  reply.send({ status: "ok", timestamp: new Date().toISOString() });
};
