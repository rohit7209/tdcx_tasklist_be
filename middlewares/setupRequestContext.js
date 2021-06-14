const { v4: uuid } = require('uuid');
const { createLogger, format, transports } = require('winston');
const httpContext = require('express-http-context');
const connectionPool = require('../storage');

const { prettyPrint, combine, timestamp, label, simple, splat } = format;

module.exports = () => {
  const logger = createLogger({
    level: 'info',
    format: combine(
      splat(),
      label({ label: process.env.NODE_ENV }),
      timestamp(),
      prettyPrint(),
    ),
    transports: [
      new transports.Console({ format: simple() }),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  return (req, res, next) => {
    const requestId = req.headers['x-request-id'] || uuid();
    httpContext.set('x-request-id', requestId);
    httpContext.set('logger', logger.child({ 'x-request-id': requestId, 'path': req.path }));
    httpContext.set('dbPool', connectionPool);
    next();
  };
};
