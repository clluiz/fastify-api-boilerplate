import {
    FastifyInstance,
    FastifyPluginAsync,
    RouteShorthandOptions,
} from "fastify";

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    pong: {
                        type: "string",
                    },
                },
            },
        },
    },
};

const r2: FastifyPluginAsync = async (
    fastify: FastifyInstance,
): Promise<void> => {
    fastify.get("/", opts, () => {
        return { pong: "it worked!" };
    });
};

export default r2;
