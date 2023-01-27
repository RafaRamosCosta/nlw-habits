import WebPush from 'web-push';

import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const publicKey =
  'BFR9fuUqgF3xyQA7x6sEX420h9_4V9K7a8CyxeeqKUkWeJCX2E_yk5NAbaxJN4kZ5eEqiCz-nEfXR4V8MF8QOyg';

const privateKey = 'WgPmWoddlYefJMF3stMUDl8gxSlAQHVvSBv9wN-He_k';

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey);

export async function notificationsRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    };
  });

  app.post('/push/register', (req, res) => {
    console.log(req.body);

    return res.status(201).send();
  });

  app.post('/push/send', async (req, res) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(req.body);

    WebPush.sendNotification(subscription, 'Hello do backend');

    return res.status(201).send();
  });
}
