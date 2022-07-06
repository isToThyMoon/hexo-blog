---
title: vue cli 3
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 00.配置
---

从Vue CLI 3.0 开始，Webpack的配置文件从webpack.config.js变为了vue.config.js

`npm install -g @vue/cli` 安装全局脚手架工具vue cli

`vue create myProject` 创建一个项目

如果你不知道webpack是什么，只做一个最小原型，vue cli并没有暴露webpack配置文件。

相比于react，如果开发者需要自行配置webpack，react脚手架提供eject命令，直接暴露所有底层配置文件，你可以自由最大化配置webpack。

vue设计思路不同，如果你想要配置webpack，它提供了一套他以为很简单灵活的api配置参数做中转来配置webpack。

根目录创建文件：vue.config.js

它不需要你会webpack。你只需要学习它的配置方法。
所有配置参数在vue cli 3官网，配置参考里，vue cli对webpack的配置做了大量的封装。


不知不觉发展到了4.0时代，CLI给人最直白的感受是没有了build文件夹跟config文件夹，所有的配置都在Vue.config.js完成。那么该文件的配置至关重要

基础配置和注释：
```js
// vue.config.js
const path =  require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',  // 公共路径
    indexPath: 'index.html' , // 相对于打包路径index.html的路径
    outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // 向 PWA 插件传递选项。
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
    },
    css: {
        extract: IS_PROD,
        requireModuleExtension: false,// 去掉文件名中的 .module
        loaderOptions: {
                // 给 less-loader 传递 Less.js 相关选项
                less: {
                    // `globalVars` 定义全局对象，可加入全局变量
                    globalVars: {
                        primary: '#333'
                    }
                }
        }
    },
    devServer: {
            overlay: { // 让浏览器 overlay 同时显示警告和错误
              warnings: true,
              errors: true
            },
            host: "localhost",
            port: 8080, // 端口号
            https: false, // https:{type:Boolean}
            open: false, //配置自动启动浏览器
            hotOnly: true, // 热更新
            // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
            proxy: { //配置多个跨域
                "/api": {
                    target: "http://172.11.11.11:7071",
                    changeOrigin: true,
                    // ws: true,//websocket支持
                    secure: false,
                    pathRewrite: {
                        "^/api": "/"
                    }
                },
                "/api2": {
                    target: "http://172.12.12.12:2018",
                    changeOrigin: true,
                    //ws: true,//websocket支持
                    secure: false,
                    pathRewrite: {
                        "^/api2": "/"
                    }
                },
            }
        }
}
```