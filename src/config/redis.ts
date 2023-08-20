import { Redis } from 'ioredis';
import { config } from './index.js';

export const connection = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null,
});
