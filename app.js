var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var jobprofile = require('./api/jobprofile/jobprofileRoutes.js');
var user = require('./api/user/userRoutes.js');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/jobprofile', jobprofile);
app.use('/user', user);

module.exports = app;