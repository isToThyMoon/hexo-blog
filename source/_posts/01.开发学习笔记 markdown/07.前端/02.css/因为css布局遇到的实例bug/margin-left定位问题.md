---
title: margin-left定位问题
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 02.css
  - 因为css布局遇到的实例bug
tags:
  - css
date:
---


圣杯布局中出现的问题：
margin-left: -100%;

container中三个float元素 设置position为relative
分别为middle left right
第一个元素为middle占据父级100%宽度
第二个元素设置margin-left: -100%;
怎么理解？
margin-left: -100%; 该元素相对紧靠着的左边元素的margin是父元素宽的负百分之百
这里三个元素全部浮动，脱离文档流，left元素设置margin-left是针对与其左边元素的margin，虽然因为middle占据100%父级宽度，导致left和right元素浮动换行，但是left元素设置margin-left的参照对象仍然是在流中按顺序在其左边的middle元素。-100%表示数据是父级宽度的100%。反向。