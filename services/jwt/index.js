const jwt = require('jsonwebtoken');

const generateAccessToken = (userObj) => jwt.sign(userObj, process.env.JWT_SECRET_KEY, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

const destroyAccessToken = (userObj) => jwt.sign(userObj, process.env.JWT_SECRET_KEY, {
  algorithm: 'HS256',
  expiresIn: 5,
});

const authenticateAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET_KEY);

module.exports = {
  generateAccessToken,
  authenticateAccessToken,
  destroyAccessToken,
};
