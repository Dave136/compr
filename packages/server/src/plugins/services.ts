import fp from 'fastify-plugin';

import { AuthService } from '../modules';

import type { FastifyInstance, RegisterOptions } from 'fastify';
import type { IAuthService } from '../modules';

export type Services = {
  auth: IAuthService;
};

export default fp(
  async (
    fastify: FastifyInstance,
    _: RegisterOptions,
    next: (err?: Error) => void
  ): Promise<void> => {
    const auth = new AuthService();

    fastify.decorate('services', {
      auth,
    });

    next();
  },
  { name: 'services', dependencies: ['typeorm'] }
);
