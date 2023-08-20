import { setupServer } from './server.js';
import { setUpWorker } from './worker.js';

const worker = setUpWorker();

const server = (await setupServer()).listen(3000, () => {
  console.log('Server is up 3000');
});

const closeGracefully = async () => {
  // TODO: Promisify the server close
  server.close(() => {
    console.log('Server is down');
  });

  await worker.close(true);
  process.exit(0);
};

process.on('SIGINT', closeGracefully);

process.on('SIGTERM', closeGracefully);
