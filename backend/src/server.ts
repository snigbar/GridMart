import mongoose from 'mongoose';

import config from './config/config';
import { Server } from 'http';
import app from './app/app';
import logger from './logs/logger';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.url as string);
    logger.info('Connected to DB');
    server = app.listen(config.port, () => console.log(`Running on port ${config.port}`));
    logger.info(`App is running on port ${config.port}`);
  } catch (error) {
    logger.error(error || 'Something Went wrong');
  }
}

main();

process.once('unhandledRejection', (reason: any) => {
  logger.error('😈 unhandledRejection detected:', { reason });
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  logger.error('🧨 uncaughtException detected:', { message: err.message, stack: err.stack });
  process.exit(1);
});
