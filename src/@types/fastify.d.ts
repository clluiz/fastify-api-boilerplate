// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance extends FastifyInstance {
    config: {
      PORT: number | undefined;
      DATABASE_URL: string;
    };
  }
}
