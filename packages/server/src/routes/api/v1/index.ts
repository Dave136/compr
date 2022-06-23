import type {
  FastifyError,
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export default function (
  fastify: FastifyInstance,
  _: FastifyRegisterOptions<unknown>,
  done: (err?: FastifyError) => void
) {
  fastify.get('/', (req: FastifyRequest, reply: FastifyReply) => {
    return { message: 'Hi from my API' };
  });

  done();
}
