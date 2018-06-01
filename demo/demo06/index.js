var express = require('express');
var path = require('path');
var app = express();

//静态资源
app.use(express.static(path.join(__dirname,'public')));

//后缀为ejs
//app.set('views',path.join(__dirname,'views'));
//app.set('view engine','ejs');

//后缀为html
var ejs = require('ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');

require('./routers/index')(app);		//初始化路由

//监听端口
app.listen(3001,function(){
	console.log('app is running at port 3001');
});
