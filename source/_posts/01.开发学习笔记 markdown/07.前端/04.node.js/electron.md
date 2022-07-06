---
title: electron
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 04.node.js
---

进入项目
	
	cd electron-quick-start

安装依赖
 
 	npm install

启动调试这个项目
	
	npm run start




全局安装打包神器
	
	npm install electron-packager -g

键入这行命令开始打包
	
	electron-packager . app --win --out Debug --arch=x64 --version 1.4.14 --overwrite --ignore=node_modules

打包命令的含义
	
	electron-packager . 可执行文件的文件名 –win –out 输出目录 –arch=x64位还是32位 –version 版本号 –overwrite –ignore=node_modules(依赖) –icon=icon.ico(图标)


