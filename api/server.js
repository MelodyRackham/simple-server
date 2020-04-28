const express = require('express');
const helmet = require('helmet');

const apiRouter = require('./api-router.js');

const server = express();

server.use(helmet());

server.use(expression.json());

server.get('/', (req, res) => {
  Shoutouts.find()
    .then((shoutouts) => {
      res.status(200).json(shoutouts);
    })
    .catch((error) => {
      console.log('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the shoutouts ' });
    });
});

module.exports = server;
