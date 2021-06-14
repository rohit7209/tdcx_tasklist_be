const { split } = require('lodash');

const trimToken = (token) => split(token, ' ')[1];

module.exports = {
  trimToken,
};
