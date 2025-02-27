import Fastify, { FastifyInstance } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import swagger from "./infrastructure/plugins/swagger.js";
import swaggerUI from "./infrastructure/plugins/swaggerUI.js";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
//import { Server, IncomingMessage, ServerResponse } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server: FastifyInstance = Fastify({});

server.register(swagger);
server.register(swaggerUI);

server.register(fastifyAutoload, {
  dir: join(__dirname, "infrastructure/http/routes"),
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
