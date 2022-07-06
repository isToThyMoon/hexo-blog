---
title: 图片转base64
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 04.node.js
  - 应用
---

var fs = require("fs")

var imageData = fs.readFileSync("./1.jpeg")
var imageBase64 = imageData.toString('base64');

var Base64Code = "data:image/bmp;base64," + imageBase64;

console.log(Base64Code)

