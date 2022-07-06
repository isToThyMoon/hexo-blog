---
title: 组件的render函数
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 01.root
---

template-> render() -> h -> 虚拟dom（js对象）-> 真实dom -> 展示到页面上

template 会在后台被编译成render()函数执行
就这么简单

render()函数需要return由h()函数构建的vue里的虚拟dom
h()的三个参数 标签名 attribute content
content里可以用数组重复嵌套h()函数层级渲染dom节点

虚拟dom是真实dom的一个js对象映射 它就是一个js对象
虚拟dom可以做什么
weex 移动端等等

```js
const app = Vue.createApp({
    template: `
        <div><my-title :level="1">hello ha</my-title></div>
    `
});

app.component('my-title', {
    props: ['level'],
    render(){
        const { h } = Vue;
        return h("h"+this.level, {}, this.$slots.default())
    }
});
app.mount('#root');
```