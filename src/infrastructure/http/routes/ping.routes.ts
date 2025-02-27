import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from "fastify";
import { pong } from "../controllers/ping.controller.js";

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

const pingRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get("/ping", opts, pong);
};

export default pingRoutes;
