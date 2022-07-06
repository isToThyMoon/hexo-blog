---
title: node http-server
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 04.node.js
tags:
  - react
date:
---

网络上已经有人实现了一个不错的，取名叫做 http-server
使用方法很简单：

```
mkdir http-demo
touch xxx.html
npm install -g http-server
http-server -c-1
```

就可以访问 http://localhost:8080/xxx.html 来预览你的 html 了。
Windows 用户注意了，Windows 上 http-server 的缓存无法消除，如果你发现你改了页面，页面却无法更新，那么就这样做：
1.	打开 Chrome 开发者工具
2.	点击 Network
3.	勾选 Disable Cache
这样缓存就不存在了


# 我们现在自己就来搞起一个服务器，然后提供 HTTP 服务。

服务器你已经有了，你使用的电脑就是服务器。

但是你还没有提供 HTTP 服务的「程序」

用脚本就可以提供 HTTP 服务，不管是 Bash 脚本还是 Node.js 脚本都可以。由于 Bash 脚本的语法实在是反人类，而且我们今后要学习 JavaScript，所以我们先用 Node.js 脚本试试水吧。

1	Node.js 服务器
2	接收请求
```
cd ~/Desktop; mkdir node-demo; 
cd node-demo
touch server.js
```
编辑 server.js，内容我已经上传到 GitHub。
运行 node server 8888或者 node server.js 8888，看到报错根据报错提示调整你的命令

在新的 Bash 窗口运行 curl http://localhost:你的指定的端口/xxx 或者 curl http://127.0.0.1:你指定的端口/xxx。

再次强调，后缀是废话。文件内容是有 HTTP 头中的 Content-Type 保证的

HTTP 路径不是文件路径！！！/xxx.html 不一定对应 xxx.html 文件

```javascript
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('HTTP 路径为\n' + path)
  if(path == '/style.css'){
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  }else if(path == '/script.js'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("这是JS执行的")')
    response.end()
  }else if(path == '/index.html'){
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'  + 
      '<head><link rel="stylesheet" href="/style.js">' +
      '</head><body>'  +
      '<h1>你好</h1>' +
      '<script src="/script.html"></script>' +
      '</body></html>')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

```

