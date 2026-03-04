import { FastifyPluginAsync } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pingModule: FastifyPluginAsync = async (app) => {
    app.register(fastifyAutoload, {
        dir: join(__dirname, "routes"),
        dirNameRoutePrefix: true,
    });
};

export default pingModule;