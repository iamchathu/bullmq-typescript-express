import { BullMonitorExpress } from '@bull-monitor/express';
import { BullMQAdapter } from '@bull-monitor/root/dist/bullmq-adapter.js';
import type { Express, Request, Response } from 'express';
import express from 'express';
import { addJob, taskQ } from './config/queue.js';

export const setupServer = async (): Promise<Express> => {
  const app = express();

  const monitor = new BullMonitorExpress({
    queues: [new BullMQAdapter(taskQ)],
  });
  await monitor.init();

  taskQ.resume();

  app.use('/add-job', (req: Request, res: Response) => {
    console.log('New Job');

    addJob();

    res.json({
      status: 'done',
    });
  });

  app.use('/monitor', monitor.router);

  return app;
};
