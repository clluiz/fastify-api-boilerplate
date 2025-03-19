import Fastify, { FastifyInstance } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import swagger from "./infrastructure/plugins/swagger.js";
import swaggerUI from "./infrastructure/plugins/swaggerUI.js";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
  },
};

const options = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

const server: FastifyInstance = Fastify({});

await server.register(fastifyEnv, options);
server.register(swagger);
server.register(swaggerUI);

server.register(fastifyAutoload, {
  dir: join(__dirname, "infrastructure/http/routes"),
});

const start = async () => {
  try {
    console.log(server.config.PORT);
    await server.listen({ port: server.config.PORT });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
