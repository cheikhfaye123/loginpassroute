const express = require('express');
const app = express();
require('dotenv').config();

const middlewares = require('./middlewares');
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(middlewares.logger);

app.use('/', routes);

let PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT)
  .on('listening', () => {
    const actualPort = server.address().port;
    console.log(`Server is running on port ${actualPort}`);
    console.log('Secret word from env:', process.env.SECRET_WORD);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy. Trying to find an available port...`);
      server.listen(0);
    } else {
      console.error('Error starting server:', err);
    }
  });