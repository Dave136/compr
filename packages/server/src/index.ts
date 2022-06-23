import 'reflect-metadata';
import * as dotenv from 'dotenv';
import runServer from './server';

(async () => {
  dotenv.config();
  const server = await runServer();

  if (typeof process.env.PORT === 'undefined') {
    throw new Error('Missing "PORT" environment variable');
  }

  server.listen({
    port: +process.env.PORT,
    host: 'localhost',
  });
})();
