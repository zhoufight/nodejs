var express = require('express');
var app = express();

console.log('test hotnode');
console.log('test node-dev');
app.listen(3002,function(){
	console.log('app is running at port 3002');
});
