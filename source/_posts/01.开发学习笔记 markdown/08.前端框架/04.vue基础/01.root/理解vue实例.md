---
title: 理解vue实例
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 01.root
---

为什么我们可以访问data中声明的属性？
https://my.oschina.net/cc4zj/blog/4497987

```js
var app = new Vue({
    el: '#app',
    data: {
        foo: 'dadada'
    },

    computed: {
        bar: function () {
            // this 指向vm实例
            return this.foo
        }
    }
})
```

data选项中声明了属性foo，我们就可以通过app.foo,或者在created，mounted， methods中定义的方法里通过 this.foo来访问这个属性。

这里计算属性出现了this 且官网说明这里的this是指向vm这个实例的。 
而这实例下居然直接挂载了data声明的属性foo 为什么呢？

这么理解
new Vue() 时接受的是一个配置的对象，el data computed methods等等都是Vue来声明对象内容的关键字，
他们并不是实例的直接属性。
源码内部通过bind事先绑定了this的指向到实例对象。

一般来说data现在的值是一个返回一个对象的函数，源码内部会对它进行处理，最后通过defineProperty把data内容复制到实例上。要注意的是，其实复制到实例后我们获取这个属性是通过getter setter方法来获取的。

它为了方便使用者理解，
也就是data声明了（vm这个实例对象）数据属性。computed声明计算属性。methods声明的就是它的方法
