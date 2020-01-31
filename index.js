/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// const product = require('./routes/product');
// const blog = require('./routes/blog');
const voter = require('./routes/voter');
const logger = require('./logger');
require('dotenv').config();

const app = express();
global.logger = logger;

// Set up mongodb connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(cors())
// register middlewares
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "POST,GET,DELETE");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use('/', voter);

app.listen(process.env.PORT, () => logger.info(`Server: Voter API app listening on port ${process.env.PORT}!`));
