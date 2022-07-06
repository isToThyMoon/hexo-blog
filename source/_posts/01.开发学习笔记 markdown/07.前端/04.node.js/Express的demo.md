---
title: Express的demo
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 04.node.js
---
``` javascript
// express_demo.js 文件

// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var jsonParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

// var todoList = []

// 配置静态文件目录
app.use(express.static('static'))

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data){
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}
// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
app.get('/', function(request, response) {
    // var r = `
    // `
    // fs 是 file system 文件系统的缩写
    // fs 是 node 中处理文件和目录的库
    // var fs = require('fs')
    // var options = {
    //     encoding: 'utf-8'
    // }
    // fs.readFile('index.html', options, function(err, data){
    //     console.log('读取的html文件内容是', data)
    //     response.send(data)
    // })
    var path = 'index.html'
    sendHtml(path, response)
})

var todos = [
    {
        id: 1,
        task: '吃饭',
    }
]

var dataFile = 'todo.txt'
var fs = require('fs')

var loadTodosFromFile = function(callback) {
    fs.readFile(dataFile, 'utf8', function(err, data){
        if (err != null) {
            // 出错了
            console.log('出错了')
            todos = []
            callback()
        } else {
            todos = JSON.parse(data)
            callback()
        }
    })
}
/*
ajax('GET', '/todo/all', '', function(r){
    console.log(r.response)
})
*/
app.get('/todo/all', function(request, response) {
    // var r = JSON.stringify(todos)
    // response.send(r)
    // 从文件中 读取所有的 todos 再返回给浏览器
    loadTodosFromFile(function(){
        var r = JSON.stringify(todos)
        response.send(r)
    })
})

var writeTodosToFile = function() {
    var s = JSON.stringify(todos)
    fs.writeFile(dataFile, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

var todoAdd = function(todo) {
    // {"task":"ii gw"}
    // 给 todo 加上 id 信息
    var t = todos[todos.length-1]
    if (t == undefined) {
        todo.id = 1
    } else {
        todo.id = t.id + 1
    }
    // 把 todo 加入 todos 数组
    todos.push(todo)
    // 把 todos 保存到文件中
    writeTodosToFile()
    return todo
}

/*
ajax('POST', '/todo/add', '{"task":"ii gw"}', function(r){
    console.log(r.response)
})
*/
app.post('/todo/add', function(request, response) {
    // request.body
    var todo = request.body
    // console.log('post todo add', request.body, typeof request.body)
    // console.log(todo.task)
    var t = todoAdd(todo)
    var r = JSON.stringify(t)
    response.send(r)
})

// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s",
    host, port)
})
```

