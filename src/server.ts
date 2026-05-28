import Fastify, { FastifyInstance } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import fastifyUserAgent from "fastify-user-agent";
import cors from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import swagger from "./shared/plugins/swagger.js";
import swaggerUI from "./shared/plugins/swaggerUI.js";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const schema = {
  type: "object",
  required: ["PORT", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME"],
  properties: {
    PORT: {
      type: "string",
      default: 3000,
    },
    DB_HOST: { type: "string", default: "localhost" },
    DB_PORT: { type: "string", default: "5435" },
    DB_USER: { type: "string" },
    DB_PASSWORD: { type: "string" },
    DB_NAME: { type: "string" },
  },
};

const options = {
  confKey: "config",
  schema: schema,
  dotenv: true,
};

const server: FastifyInstance = Fastify({});

await server.register(fastifyEnv, options);
server.register(fastifyFormbody);
server.register(swagger);
server.register(swaggerUI);
server.register(fastifyUserAgent);
server.register(cors, {
  origin: "*",
});

server.register(fastifyAutoload, {
  dir: join(__dirname, "modules"),
  dirNameRoutePrefix: false,
  ignorePattern:
    /.*(controllers|entities|dtos|routes|services|types|usecases).*/,
  options: {
    prefix: "/api/",
  },
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

const start = async () => {
  try {
    await server.listen({ port: server.config.PORT, host: "0.0.0.0" });
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server running on port ${port}`);
    console.log(server.printRoutes());
  } catch (err) {
    console.error("Server startup error:", err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
