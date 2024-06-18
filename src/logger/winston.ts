import moment from 'moment';
import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.printf((log) => {
      if (log.stack) {
        return `[${log.timestamp}] [Error] ${log.message} ${log.stack}`;
      }
      return `[${log.timestamp}] [Info] ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: path.join(__dirname, '../../logs/NFT_MarketPlace_log_%DATE%.log'), // Chỉnh đường dẫn cho đúng './logs/NFT_MarketPlace_log_%DATE%.log',
      datePattern: 'YYYY_MM_DD',
      maxFiles: '7d'
    })
  ]
});

export default logger;




// const moment = require('moment');
// const winston = require('winston');
// const path = require('path');
// const DailyRotateFile = require("winston-daily-rotate-file");

// Logger cho các thông báo thông thường
// const infoLogger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.splat(),
//         winston.format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         winston.format.colorize(),
//         winston.format.printf(
//             log => `[${log.timestamp}] [Info] ${log.message}`
//         ),
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new DailyRotateFile({
//             filename: "./logs/NFT_info_%DATE%.log",
//             datePattern: "YYYY_MM_DD",
//             level: 'info', // Thiết lập level info cho logger này
//             maxFiles: '1d'
//         })
//     ],
// });

// // Logger cho các thông báo lỗi
// const errorLogger = winston.createLogger({
//     format: winston.format.combine(
//         winston.format.splat(),
//         winston.format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//         }),
//         winston.format.colorize(),
//         winston.format.printf(
//             log => `[${log.timestamp}] [Error] ${log.message} ${log.stack || ''}`
//         ),
//     ),
//     transports: [
//         new winston.transports.Console(),
//         new DailyRotateFile({
//             filename: "./logs/NFT_error_%DATE%.log",
//             datePattern: "YYYY_MM_DD",
//             level: 'error', // Thiết lập level error cho logger này
//             maxFiles: '1d'
//         })
//     ],
// });

// module.exports = {
//     info: (message) => {
//         infoLogger.info(message);
//     },
//     error: (message, stack) => {
//         errorLogger.error(message, { stack });
//     }
// };
