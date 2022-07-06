---
title: node
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 04.node.js
---
// 此为第 17 课的上课内容
//
// 今天的内容是
//
// 用 node.js 开发脱离浏览器的 js 程序
// (主要用于工具或者服务端, 比如文件处理)
//
// 用 express 简述后端开发的流程
// (前端和后端配合工作, 了解一下后端是很有好处的)
//
// 如果时间多, 会讲一下使用 electron 开发桌面程序


// nodejs 安装
// http://www.runoob.com/nodejs/nodejs-install-setup.html
//

// npm(node package manager)
// package 就是我们之前说的库, 比如 bootstrap


//
// express 框架安装使用(它是一个流行的基于 nodejs 的服务器开发框架)
// http://www.runoob.com/nodejs/nodejs-express-framework.html
	
	npm install express
	npm install body-parser
	npm install cookie-parser
	npm install multer



	var a = 'hello'
	console.log(a, ' gua')

	var os = require('os')
	console.log(os.uptime())


	var fs = require('fs')
	fs.readdir('.', function(err, files){
	    console.log('error', typeof err, err)
	    if(err != null) {
	       console.log(err)
	    } else {
	       console.log('files', files)
	   }
	})

// var file = 'message.txt'
// fs.unlink(file, (err) => {
//   if (err) {
//     //   log('error', err, err.path)
//   } else {
//       console.log(`${file} 成功删除`)
//   }
// })

// fs.writeFile('message.txt', '你好 Node.js', (err) => {
//   if (err) {
//       console.log(err)
//   } else {
//       console.log('写入成功')
//   }
// })
