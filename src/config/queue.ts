import { Queue } from 'bullmq';
import type { ResultData } from '../data/result.js';
import { AppJob } from '../data/task.js';
import { config } from './index.js';
import { connection } from './redis.js';

export const taskQ = new Queue<AppJob, ResultData, string>(config.queue.name, {
  connection,
});

export const addJob = () => {
  taskQ.add('job', new AppJob(1), {
    removeOnComplete: true,
  });
};
