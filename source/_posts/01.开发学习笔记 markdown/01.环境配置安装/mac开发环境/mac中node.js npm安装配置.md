---
title: mac中node.js npm安装配置
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
tags:
  - npm
date:
---


# node安装：
~~
This package has installed:
	•	Node.js v12.14.1 to /usr/local/bin/node
	•	npm v6.13.4 to /usr/local/bin/npm（注意这里是替身）
Make sure that /usr/local/bin is in your $PATH.
~~

一般不采用官方包下载安装， 更好的方式是使用brew安装管理

# 更换镜像源
默认：https://registry.npmjs.org/
npm淘宝镜像源：

```
npm get registry
npm config set registry https://registry.npm.taobao.org

```

# mac中全局安装npm显示文件夹写入权限问题
npm config get prefix

刚安装完成默认是/usr/local

## 解决方法总结：
设置全局包安装位置
`npm config set prefix '~/.npm-global'`

## 详细：
官方给出的一个解决办法是跟改全局安装包的路径：

第一步：在你的用户文件下新建一个文件夹，这个.npm-global 名字可以用你自己喜欢的名字替换，推荐直接使用这个名字。
mkdir ~/.npm-global

第二步：更改node的安装连接
npm config set prefix '~/.npm-global'

第三步：在用户的.bash_profile下增加path，为的是系统能够找到可执行文件的目录
export PATH=~/.npm-global/bin:$PATH

第四步：update profile 使其生效
source ~/.bash_profile


卸载全局模块 `npm uninstall -g`


## 常用命令

`npm list -g --depth 0`