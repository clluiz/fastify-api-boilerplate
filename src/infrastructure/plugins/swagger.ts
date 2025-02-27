import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fp from "fastify-plugin";

// plugins/swagger.js
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: "Fastify boilerplate",
        description: "API documentation with Fastify and Swagger",
        version: "1.0.0",
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
  });
});
