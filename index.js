require('dotenv').config(); // this library has a config method takes any variables inside .env and puts them on the process.env object.

const server = require('./api/server.js');

const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log(`\n*** Server Running on Port ${port} ***\n`);
});

// when running locally the IP is taken care of by localhost
// and we can hardcode any old port (over 3000)

// when deploying
//heroku will assign an IP address
// we can't hardcode in the port (it may already be in use!!)

// heroku needs to tell us which port!
