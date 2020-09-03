const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const plantsRouter = require('./plants/plants-router.js');
const restricted = require('../auth/restricted-middleware.js');

const server = express();
      server.use(express.json());
      server.use('/uploads//', express.static('uploads'))
      server.use(cors());
      server.use(helmet());
      server.use('/api/auth', authRouter);
      server.use('/api/users', restricted, usersRouter);
      server.use('/api/plants', restricted, plantsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align:center;">Welcome to the server!</h1>
  `);
});

module.exports = server
