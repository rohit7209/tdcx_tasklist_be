const { trimToken } = require('../utils');
const { authenticateAccessToken } = require('../services/jwt');
const httpContext = require('express-http-context');
const { get } = require('lodash');


module.exports = (req, res, next) => {
  try {
    const rawToken = get(req, 'headers.authorization') || get(req, 'headers.Authorization') || '';
    if(!rawToken.includes('Bearer')){
      throw new Error('Authorization information is missing or invalid.');
    }
    const token = trimToken(rawToken);
    const { user } = authenticateAccessToken(token);
    if(!user){
      throw new Error('Invalid token!');
    }
    httpContext.set('userToken', token);
    httpContext.set('user', user);
    next();
  } catch (e) {
    res.status(401);
    res.send(e.message || 'Authorization information is missing or invalid.');
  }
};
