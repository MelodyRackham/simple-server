const express = require('express');
const helmet = require('helmet');

const apiRouter = require('./api-router.js');

const server = express();

server.use(helmet());

server.use(expression.json());

server.get('/', (req, res) => {
  Shoutouts.find()
    .then((shoutouts) => {
      const messageOfTheDay = process.env.MOTD || 'Catch em all';
      res.status(200).json({ motd: messageOfTheDay, shoutouts });
    })
    .catch((error) => {
      console.log('\nERROR', error);
      res.status(500).json({ error: 'Cannot retrieve the shoutouts ' });
    });
});

module.exports = server;
