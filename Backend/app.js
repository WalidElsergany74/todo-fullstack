const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db');
const todoRouter = require('./routes/todoRoutes.js');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Ensure DB is connected on every request (critical for serverless/Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});




// 3) ROUTES
app.use('/api/v1/todos', todoRouter);

module.exports = app;
