import winston from 'winston';
import chalk from 'chalk';
import DailyRotateFile from 'winston-daily-rotate-file';
import fs from 'fs';
import path from 'path';

// Log directory
const logDir = path.join(__dirname, 'AppLogs');

// Ensure log dir exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create custom colors for console
const consoleFormat = winston.format.printf(({ level, message, timestamp }) => {
  let coloredLevel = level;
  switch (level) {
    case 'info':
      coloredLevel = chalk.hex('#5bc0de')(level.toUpperCase()); // light blue
      break;
    case 'warn':
      coloredLevel = chalk.yellow(level.toUpperCase());
      break;
    case 'error':
      coloredLevel = chalk.red(level.toUpperCase());
      break;
    default:
      coloredLevel = chalk.gray(level.toUpperCase());
  }

  return `${chalk.gray(timestamp)} ${coloredLevel}: ${message}`;
});

// Generate log header once per new log file
const logHeader = () => {
  const now = new Date();
  return `========== LOG START: ${now.toISOString().replace('T', ' ').slice(0, 19)} ==========\n`;
};

// Setup daily rotating log file
const fileTransport = new DailyRotateFile({
  filename: path.join(logDir, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxFiles: '7d',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level.toUpperCase()}: ${message}`;
    }),
  ),
  createSymlink: true,
  symlinkName: 'current.log',
});

// Add header to log file when it’s created
fileTransport.on('new', (filename) => {
  fs.appendFileSync(filename, logHeader());
});

// Winston logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    // turn on on prod mode to dump log
    // fileTransport,
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat,
      ),
    }),
  ],
});

export default logger;
