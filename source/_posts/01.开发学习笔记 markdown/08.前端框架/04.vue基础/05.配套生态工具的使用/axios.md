---
title: axios
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 05.配套生态工具的使用
---

在setup函数的内部顶部
axios.get().then()

或者正常在vuex的actions处理函数里进行axios请求。
然后通过store.commit()的方式将数据commit出去
由mutations进一步处理