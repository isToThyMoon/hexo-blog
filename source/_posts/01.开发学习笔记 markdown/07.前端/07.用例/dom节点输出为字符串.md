---
title: dom节点输出为字符串
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 07.用例
---

`document.querySelector(selector).outerHTML;`

或者取父节点的innerHTML属性：
```js
let tmpNode = document.createElement('div');
tmpNode.appendChild(node) ;
let str = tmpNode.innerHTML;
```