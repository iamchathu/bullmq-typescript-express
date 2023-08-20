export const config = {
  queue: {
    name: 'task-q',
  },
  redis: {
    host: process.env.REDIS_HOST ?? '',
    port: parseInt(process.env.REDIS_PORT ?? '6379'),
  },
};
