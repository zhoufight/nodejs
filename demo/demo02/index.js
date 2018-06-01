var express = require('express');
var app = express();

//一般log4js的使用
//var log4js = require('log4js');
//var logger = log4js.getLogger();
//logger.level = 'debug';


//配置log4js并文件输出
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

app.get("/",function(req,res){
	logger.debug('express log4js');
	logger.info('express info log');
	logger.error('express error log');
	res.send('hello log4js');
});

app.listen('8083');