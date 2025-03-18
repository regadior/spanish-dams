// logger.js
const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH-mm',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '7d',
    }),
  ],
})
