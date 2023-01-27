import cors from '@fastify/cors';

import Fastify from 'fastify';
import { notificationsRoutes } from './notifications-routes';
import { appRoutes } from './routes';

const app = Fastify();

app.register(cors);

app.register(appRoutes);

app.register(notificationsRoutes);

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('server running'));
