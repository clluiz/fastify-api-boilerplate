import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { pong } from "../controllers/ping.controller.js";

const pingRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get("/ping", pong);
};

export default pingRoutes;
