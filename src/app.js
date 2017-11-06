'use strict';

const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connection.openUri(`mongodb://${config.db.host}/${config.db.dbName}`);
require('./models/file.model.js');

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use('/api', router);



app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});
