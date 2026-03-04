import { FastifyInstance } from "fastify";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";

// plugins/swagger.js
export default fp(async function (fastify: FastifyInstance) {
  fastify.register(fastifySwaggerUi, {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    // uiHooks: {
    //   onRequest: function (request, reply, next) {
    //     next();
    //   },
    //   preHandler: function (request, reply, next) {
    //     next();
    //   },
    // },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    // transformSpecification: (swaggerObject, request, reply) => {
    //   return swaggerObject;
    // },
    transformSpecificationClone: true,
  });
});
