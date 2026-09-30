const express = require('express');
const morgan = require('morgan');
const todoRouter = require('./routes/todoRoutes.js');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));





// 3) ROUTES
app.use('/api/v1/todos', todoRouter);

module.exports = app;
