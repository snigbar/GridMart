import mongoose from 'mongoose';

import config from './config/config';
import { Server } from 'http';
import app from './app/app';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.url as string);
    console.log('-------connected to db---------');
    server = app.listen(config.port, () => console.log(`Running on port ${config.port}`));
  } catch (error) {
    console.log(error);
  }
}

main();

process.once('unhandledRejection', (reason: any) => {
  console.error('😈 unhandledRejection detected:', reason);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('🧨 uncaughtException detected:', err);
  process.exit(1);
});
