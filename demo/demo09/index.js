var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/get',function(req,res,next){
	var query = req.query;
	console.log(query);
});

app.post('/post',function(req,res,next){
	var body = req.body;
	console.log(body);
	res.send('hello');
});

app.post('/postjson',function(req,res,next){
	var params = req.body;
	console.log(params);
	res.send('hello');
});


app.listen('3000',function(){
	console.log('app running at port 3000');
});
