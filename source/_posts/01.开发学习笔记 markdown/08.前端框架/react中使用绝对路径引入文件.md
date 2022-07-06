---
title: react中使用绝对路径引入文件
categories: 
  - 01.开发学习笔记 markdown
  - 08.前端框架
---

随着Create React App 3的发布，我们现在引入组件或对象时可以使用绝对路径（absolute import),而不需要eject项目

输入路径更加容易, 不再需要 ../../../../地狱模式
你可以复制/粘贴代码包括导入到其他文件中，而不需要修改引用路径
你可以移动文件而不需要更新引用路径(假如你的IDE没有帮你这么做)
简洁
根据官方文档的解释，在你项目的根目录下创建jsconfig.json文件，并添加以下代码

```js
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```
