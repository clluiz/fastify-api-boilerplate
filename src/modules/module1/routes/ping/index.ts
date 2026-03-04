import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from "fastify";
import { ping } from "../../controllers/ping.controller.js"

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          ping: {
            type: "string",
          },
        },
      },
    },
  },
};

const r1: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get("/", opts, ping);
};

export default r1;
