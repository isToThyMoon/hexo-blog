---
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 05.webpack
  - 根路径配置文件
---
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

const complier = webpack(config);


const app = express();

app.use(webpackDevMiddleware(complier, {    // express实例通过use方法可以使用中间件
    publicPath: config.output.publicPath    //在这里需要修改config文件中output的publicPath路径为'/'  这里表示当src文件修改 complier重新运行 生成的文件打包输出的内容的publicPath
}))   

app.listen(3000, ()=> {
    console.log('server is running!')
})
