var express = require('express');
var app = express();

//日志配置
var log4js = require('log4js');
log4js.configure({
	appenders:{
		out:{type:'stdout'},
		info:{type:'file',filename:'./log/log.log'},
	},
	categories:{
		default:{
			appenders:['out','info'],
			level:'info'
		}
	}
});

var logger = log4js.getLogger();

//一般路由
/*app.get('/',function(req,res){
	res.send('hello router');
});
app.get('/post',function(req,res){
	res.json({data:'jsondata'});
});*/


//使用router
var router = express.Router();
router.get('/',function(req,res){
	res.send('hello router');
});
router.get('/post',function(req,res){
	res.json({data:'jsondata'});
});
app.use('/api',router);


app.listen('8085');

