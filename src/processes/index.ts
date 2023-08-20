import type { SandboxedJob } from 'bullmq';

export default async (job: SandboxedJob) => {
  job.log(`Started processing job with id ${job.id}`);
  console.log(`Started Job with id ${job.id}`, job.data);

  // TODO: do your CPU intense logic here

  const tick = performance.now();

  const jobs = Array.from({ length: 100 }, () => 1e9);

  for (const job of jobs) {
    let count = 0;
    for (let i = 0; i < job; i += 10) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      count++;
    }
  }

  const tock = performance.now();

  console.log(`Took ${tick - tock}ms`);

  await job.updateProgress(100);

  return 'DONE';
};
