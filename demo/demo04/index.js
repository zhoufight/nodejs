var express = require('express');
var app = express();

var routers = require('./routers/index')(app);

app.listen('8085');