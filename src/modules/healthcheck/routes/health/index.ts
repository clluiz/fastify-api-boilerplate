import {
  FastifyInstance,
  FastifyPluginAsync,
  RouteShorthandOptions,
} from "fastify";
import { healthcheck } from "../../controllers/healthcheck.controller.js";

const opts: RouteShorthandOptions = {
  schema: {
    tags: ["healthcheck"],
    description: "Returns the current health status of the API",
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
        },
      },
    },
  },
};

const healthcheckRoute: FastifyPluginAsync = async (
  fastify: FastifyInstance,
): Promise<void> => {
  fastify.get("/", opts, healthcheck);
};

export default healthcheckRoute;
