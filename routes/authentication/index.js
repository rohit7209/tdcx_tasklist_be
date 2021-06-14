const express = require('express');
const router = express.Router();
const { split } = require('lodash');
const httpContext = require('express-http-context');
const { generateAccessToken, authenticateAccessToken } = require('./../../services/jwt');
const handler = require('./../handler');

const authenticate = ({ body }) => {
  const token = body.token;
  if (!token.includes('Bearer')) {
    throw new Error('Token not valid');
  }
  return authenticateAccessToken(split(token, ' ')[1]);
};

const login = async ({ body }) => {
  const logger = httpContext.get('logger');
  const db = httpContext.get('dbPool');
  logger.info(`received request: ${JSON.stringify(body)}`);

  const { apiKey, name } = body;
  if(!apiKey || !name){
    throw new Error('Authorization information is missing or invalid::401');
  }

  const { rows } = await db.query(`SELECT * FROM "user" WHERE "apikey"='${apiKey}' AND "name"='${name}'`);

  if(!rows[0]){
    throw new Error('Authorization information is missing or invalid::401');
  }

  const user = rows[0];
  const token = generateAccessToken({ user });

  return {
    token: {
      name: user.name,
      token,
    },
    image: user.image,
  };
};


router.use('/authenticate', handler(authenticate));
router.post('/login', handler(login));

module.exports = router;
