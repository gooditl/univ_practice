'use strict';

const createError = require('http-errors');
const express = require('express');
require('express-async-errors');
require('./global/index');

const helmet = require('helmet');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require(`fs`);

global.BASE_PATH = __dirname + '/files/';

const app = express();

const options = { etag: false };
app.set("etag", false);

// app.use(helmet());
// app.use(helmet.contentSecurityPolicy());
// app.use(helmet.dnsPrefetchControl());
// app.use(helmet.expectCt());
// app.use(helmet.frameguard());
// app.use(helmet.hidePoweredBy());
// app.use(helmet.hsts());
// app.use(helmet.ieNoOpen());
// app.use(helmet.noSniff());
// app.use(helmet.permittedCrossDomainPolicies());
// app.use(helmet.referrerPolicy());
// app.use(helmet.xssFilter());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PATCH');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, x-token, Content-Type');

  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, '/frontend/views'));
app.set('view engine', 'ejs');
app.use(express.static("./frontend/public", options));

app.use('/', require('./frontend/router/index'));

app.use('/api', require('./src/controller'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
