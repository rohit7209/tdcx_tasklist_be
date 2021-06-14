const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const httpContext = require('express-http-context');

if (process.env.NODE_ENV === 'development') {
  console.info('Setting up dev environment');
  require('dotenv').config();
}

const setupRequestContext = require('./middlewares/setupRequestContext');

const server = express();
server.use(bodyParser.json());

const corsOptions = {
  origin: '*',
};

server.use(cors(corsOptions));
server.use(httpContext.middleware);
server.use(setupRequestContext());
server.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
