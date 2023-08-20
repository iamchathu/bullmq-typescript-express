import { Worker, type Job } from 'bullmq';
import { URL, fileURLToPath } from 'node:url';
import { config } from './config/index.js';

export function setUpWorker(): Worker {
  const processorFile = fileURLToPath(
    new URL('./processes/index.ts', import.meta.url),
  );

  const worker = new Worker(config.queue.name, processorFile, {
    connection: { ...config.redis },
    autorun: true,
    useWorkerThreads: true,
    concurrency: 2,
  });

  worker.on('ready', () => console.log('Worker is listening'));

  worker.on('completed', (job: Job, returnvalue: 'DONE') => {
    console.debug(`Completed job with id ${job.id}`, returnvalue);
  });

  worker.on('active', (job: Job) => {
    console.debug(`Active job with id ${job.id}`);
  });
  worker.on('error', (failedReason: Error) => {
    console.error(`Job encountered an error`, failedReason);
  });

  worker.on('stalled', (jobId) => {
    console.error(`Stalled Job ${jobId} `);
  });

  worker.on('failed', (job, error: Error, prev: string) => {
    console.error(`Job ${job?.id} failed ${error}`, prev);
  });

  return worker;
}
