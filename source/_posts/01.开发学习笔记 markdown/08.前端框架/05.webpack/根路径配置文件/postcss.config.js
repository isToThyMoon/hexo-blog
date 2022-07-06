---
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 05.webpack
  - 根路径配置文件
---
module.exports = {
    plugins: [
        require('autoprefixer') // 自动添加不同浏览器前缀 需要适配的浏览器写在了package.json里
    ]
}