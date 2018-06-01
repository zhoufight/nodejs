var express = require('express');
var app = express();

var routers = require('./router/home');

app.use('/',routers);

app.listen('8085');