import Fastify from 'fastify';
import cors from '@fastify/cors';

import servicesPlugin from './plugins/services';
import routes from './routes';

import type { FastifyInstance } from 'fastify';

export default async (): Promise<FastifyInstance> => {
  const server: FastifyInstance = Fastify({
    logger: true,
  });

  await server.register(cors);
  await server.register(routes);
  await server.register(servicesPlugin);

  return server;
};
