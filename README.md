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

## 