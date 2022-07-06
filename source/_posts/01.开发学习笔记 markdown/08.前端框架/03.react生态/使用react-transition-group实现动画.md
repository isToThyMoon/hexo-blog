---
title: 使用react-transition-group实现动画
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 03.react生态
tags:
  - react项目
date:
---

react-transition-group
react的第三方动画框架
Component：
Transition
CSSTransition
TransitionGroup

` import { CSSTransition } from 'react-transition-group'; `


原本

```
<div className = {this.state.show ? 'show' : 'hide'}>hello</div>
```

然后用一个handleToggle函数监听 处理css切换

```
handleToggle(){
	this.setState({
		show: this.state.show ? false : true
	})
}
```

现在使用CSSTransition

```
<CSSTransition
 in = {this.state.show}
 timeout = {1000}
 classNames = 'fade'
>
  <div}>hello</div>
</CSSTransition>
```

CSSTransition自动感知出入场 挂载css到div标签上


1.除了in timeout 还有其他有用的属性如：

unmountOnExit  动画结束退出后卸载这个DOM

onEntered = {(el) = {el.style.color = 'blue'}}

appear = {true}  第一次载入界面也有动画效果
这里还要设置.fade-appear 和.fade-appear-active 的css



2.有这样的几个css
.fade-enter 入场动画 show的值由false变成true

.fade-enter-active

.fade-enter-done




.fade-exit

.fade-exit-active

.fade-exit-done



3.多个DOM元素的动画切换

TransitionGroup
