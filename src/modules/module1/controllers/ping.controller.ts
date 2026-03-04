import { FastifyReply, FastifyRequest } from "fastify";

export const ping = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send({ ping: "it worked!" });
};
