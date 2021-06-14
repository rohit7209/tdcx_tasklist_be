const httpContext = require('express-http-context');
const { get, split } = require('lodash');

const handlerFunc = (handler) => async (req, res) => {
  const logger = httpContext.get('logger');
  try {
    logger.info(`Request received: ${req.path}`);
    const ctx = {
      user: httpContext.get('user') || {},
      userToken: httpContext.get('userToken') || '',
    };
    const data = await handler(req, ctx);
    res.send(data);
  } catch (e) {
    logger.error(`Error occurred: ${e.message}`);
    const message = get(split(e.message, '::'), '0');
    const errorCode = get(split(e.message, '::'), '1');

    if(errorCode){
      res.status(errorCode);
    }

    res.send(message || 'Something went wrong!');
  }
};

module.exports = handlerFunc;
