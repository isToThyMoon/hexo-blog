---
title: 09.动画效果keyframe
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 02.css
  - css3
---

动画效果：
使用最新的css3的  keyframe

	@keyframes hide-item{
		0%{
			opacity: 1;
			color: red;
		}

		50%{
			opacity: 0.5;
			color: green;
		}

		100%{
			opacity: 0;
			color: blue;
		}
	}

怎么使用呢？
在css中 把transition改成 animation

	.hide {
		opacity: 0;
		transition: all 1s ease-in;
	}

	.hide {
		opacity: 0;
		animation: hide-item 2s ease-in forwards;     //forwards保存动画最后一帧
	}
