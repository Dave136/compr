import Fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";

const server: FastifyInstance = Fastify();

server.register(fastifyCors);

server.get("/api/v1/", async () => {
  return { message: "Welcome to API" };
});

const runServer = async () => {
  try {
    await server.listen({ port: 3001 });
    console.log("Server running at http://localhost:3001");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

runServer();
