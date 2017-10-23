'use strict';

const express = require('express');
const config = require('./config');

const app = express();

app.use(function(req, res, next) {
  res.end("Hello World!");
})

app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
