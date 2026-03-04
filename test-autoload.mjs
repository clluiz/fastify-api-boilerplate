import Fastify from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path"; import * as fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = Fastify();
const modulesDir = join(__dirname, "src", "modules");

server.register(fastifyAutoload, {
  dir: modulesDir,
  matchFilter: /.*\/routes\/.*\.(ts|js)$/,
  options: { prefix: "/" },
  dirNameRoutePrefix: function (folderParent, folderName) {
    console.log("folderParent:", folderParent, "folderName:", folderName);
    if (folderParent === modulesDir) return false;
    if (folderName === "routes") return false;
    return folderName;
  }
});

server.ready().then(() => {
  console.log(server.printRoutes());
});
