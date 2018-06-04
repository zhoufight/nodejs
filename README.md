# nodejs 学习之路

## hello world

nodejs是一个基于Chrome V8引擎的javascript运行环境。通过javascript语言，可以很方便地编写后端逻辑。
nodejs中的http模块，让开发人员可以编写简单的HTTP服务器，例子如下：
```
var http = require('http');
http.createServer(function(req,res){
	res.end('hello world');
}).listen(8080);
console.log("server running at 8080");
```

将上面的内容写到一个demo.js的文件中，然后运行命令`node demo.js`即可运行成功（要先安装nodejs），然后在浏览器中输入`localhost:8080`即可查看内容。

## node初始化
nodejs通过npm来进行包管理，在package.json可以对项目进行配置以及对包进行管理。
通过命令`npm init`可以初始化一个nodejs项目，生成默认的package.json


## 第一个express项目
1)初始化项目，参考`node初始化`

2)安装express
通过npm命令`npm install -save express`在项目目录下安装express。通常安装模块都是通过`npm install 模块名`进行安装，而添加参数`-save`就是表示在当前工作目录下进行安装，而不是全局安装。
安装完成之后，在package.json文件中的`dependencies`会出现express模块

3)编写helloworld
在package.json中一般会声明入口文件和运行命令。如下:
```
"main": "index.js",
"scripts": {
"start": "node index.js"
}
```

然后在index.js这个入口文件中编写代码
```
var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('hello world');
});

app.listen(8081);
```

4)启动项目
在package.json中声明了启动命令`"start": "node index.js"`，所以通过在控制台中输入`npm run start`即可启动项目，或者直接输入命令`node index.js`也可。

5)访问地址
在浏览器中输入`localhost:8081`即可访问

6)详情见`demo/expressdemo`

## 日志输出

对于一个项目来说，日志打印毫无疑问是很重要的，日志有助于以后在使用过程中遇到问题的排查和发现问题。在express中，提供了许多的日志打印中间件。

### log4js

1)构建一个简单的express项目，步骤如上文

2)安装log4js模块
`npm install -save log4js`
然后在index.js中编写以下的代码
```
var express = require('express');
var app = express();

//一般log4js的使用
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';

app.get("/",function(req,res){
	logger.debug('express log4js');
	res.send('hello log4js');
});

app.listen('8083');
```

在浏览器输入`localhost:8083`即可看到控制台输出日志

3)log4js的配置
```
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
```

将日志打印输出到log/log.log目录下

4)代码见`demo/demo02`

## express路由
通过配置express路由，可以向外提供接口或者定位到一个资源。

1)一般的路由
express提供了许多种路由得方法，最常用的是`get`和`post`分别对应着GET和POST方法。示例如下：
```
var express = require('express');
var app = express();
app.get('/',function(req,res){
	res.send('hello router');
});
app.get('/post',function(req,res){
	res.json({data:'jsondata'});
});
```

然后在浏览器分别输入`localhost:端口号`和`localhost:端口号/post`获取内容

2)使用Router中间件
express提供了路由得中间件，可以将不同的路由分类别：
```
var express = require('express');
var app = express();
var router = express.Router();
router.get('/',function(res,req){
	res.send('hello router');
});
app.use('/post',router);
app.use('/get',router);
```

在浏览器分别输入`localhost:端口号/post`和`localhost:端口号/get`获取内容

3)更加清晰的做法，独立出来controller（入口文件为demo03中的demo.js）

3.1将post方法、get方法中的回调方法抽离出来成为controller

3.2将router单独为一个router目录

3.3然后在入口文件中汇总所有的router

4)代码见`demo/demo03`和`demo/demo04`

## nodejs模块

在js中，模块化有很多种规范。而在nodejs中，则是通过require和exports进行模块化设计的。

hello.js
```
exports.world = function(){
	console.log('hello world!');
}

exports.everyone = function(){
	console.log('hello everyone');
}
```

index.js
```
var hello = require('hello.js');
hello.world();
hello.everyone();
```

如果只封装一个对象的模块：
hello.js
```
module.exports = function(){
	console.log('hello world');
}
```

index.js
```
var hello = require('hello.js');
var h = hello();
```


## 静态资源

在express中，通过static方法可以指定静态资源的目录，方便放置css、js、image等一些静态的资源。
```
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.listen(3000,()=>{
	console.log('app is running at port 3000');
});

```

代码见`demo/demo05`

## 模板引擎

模板引擎有好多，就好像java里面也都有很多，比如jsp、thymeleaf等等。在nodejs中，这一次介绍的是ejs模板引擎。

1)安装express和ejs模块
`npm install -save express ejs`

2)在express中定义模板引擎

方法一（文件后缀为ejs）

```
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
```

方法二（文件后缀为html）

```
var ejs = require('ejs');
app.engine('html',ejs.__express);
app.set('view engine','html');
```

3)定义路由规则（参考express路由中介绍）

4）渲染模板
```
function(req,res){
	res.render('index',{name:'nodejs'});
}
```

5）运行项目，并在浏览器中打开`localhost:3001`即可看到模板的内容

6）代码详见`demo/demo06`

## 熱启动

在上面的例子中，每一个demo的编写过程中，如果改动了某一个文件，通常都要对整一个项目进行重新的启动，启动的步骤总是非常复制，所以热启动就是一个非常重要的内容。

1)hotnode模块的热启动
1.1安装hotnode模块
`npm install -g hotnode`  --这里是全局安装hotnode模块

1.2启动项目
`hotnode index.js` 通过hotnode命令启动项目，然后每一次修改文件，就会重新自启动项目。

2）node-dev模块
2.1安装
`npm install -g node-dev`

2.2启动
`node-dev index.js`

3)webpack打包启动

待补充...

4)代码见`demo/demo07`

## nodejs与mysql

业务总离不开与数据的交互，数据需要持久化就必须存储下来，所以与数据库的交互就变得非常重要。

1)安装mysql模块
`npm install -save mysql`

2)连接方式
连接mysql，可以分为普通连接和连接池连接。
其中普通连接需要每次使用完之后对连接进行关闭，需要使用的时候重新新建一个连接，所以这一个过程非常耗费资源，在项目中这明显不是一个明智的选择。
连接池连接是先初始化一定数量的连接，然后每一次使用都从连接池中取得连接，用完之后自动放回到连接池中，无需手动关闭。

普通连接数据库见`demo/demo08/mysql.js`
连接池连接数据库见`demo/demo08/conn.js`

3)操作数据
在nodejs中无论查询还是更新等操作，都是通过query()方法
```
conn.query('select * from t_user',function(err,res){
	if(err) throw err;
	console.log(res);
});

//参数化查询
conn.query('select * from t_user where id = ?',['1'],function(err,res){
	if(err) throw err;
	console.log(res);
});
```

查询出来的结果大概形式为：RowDataPacket {'':''}

将这个结果转化为可用的数据`console.log(JSON.stringify(res))`

4)事务
通过async封装了一个mysql的事务事务，见`demo/demo08/connection.js`

## 参数解析

express里面区分了get请求和post请求，而这两种请求获取请求参数又是不一样的。

get请求-query
```
app.get('/get',function(req,res,next){
	var query = req.query;
	console.log(query);
});

```

post请求-body-parser中间件
```
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/post',function(req,res,next){
	var body = req.body;
	console.log(body);
	res.send('hello');
});
```

代码见`demo/demo09`

## 使用html等编写桌面程序exe

在使用微信小程序开发工具的时候，发现开发工具目录下有一个node.exe，然后解压开发工具的exe文件，发现居然是一个html和package.json文件，所以对于nodejs打包成exe程序的有些兴趣。
简单的实验了一下，通过工具[nw.js](https://nwjs.io/)可以实现用前端的技术开发一个exe程序。
1、下载nwjs工具，并解压

2、新建一个index.html
内容自己定义

3、新建一个package.json,用以配置
```
{
	"main":"index.html",
	"name":"myapp",
	"version":"0.0.1",
	"window":{
		"title": "myapp",
	    "toolbar": true,
	    "width": 823,
	    "height": 600,
	    "min_width": 800,
	    "min_height": 600,
	    "resizable": true,
	    "show_in_taskbar": true,
	    "frame":false
	},
	"webkit": {
      "plugin": true,
      "double_tap_to_zoom_enabled": true
    }
}

```

4、将index.html和package.json打包成后缀为`.nw`的压缩包--myapp.nw

5、将打包后的nw文件和nwjs解压后目录中的nw.exe一起打包成一个新的exe文件即可

除了桌面程序exe之外，其实还有很多工具，可以将前端的技术打包成安卓apk和ios中的程序。

