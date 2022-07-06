---
title: vue cli3配置方法
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 05.webpack
date: 2020/12/31
---

`npm install -g @vue/cli` 安装全局脚手架工具vue cli

`vue create myProject` 创建一个项目

如果你不知道webpack是什么，只做一个最小原型，vue cli并没有暴露webpack配置文件。

相比于react，如果开发者需要自行配置webpack，react脚手架提供eject命令，直接暴露所有底层配置文件，你可以自由最大化配置webpack。

vue设计思路不同，如果你想要配置webpack，它提供了一套他以为很简单灵活的api配置参数做中转来配置webpack。

根目录创建文件：vue.config.js

它不需要你会webpack。你只需要学习它的配置方法。
所有配置参数在vue cli 3官网，配置参考里，vue cli对webpack的配置做了大量的封装。