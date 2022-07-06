---
title: vue-router
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 05.配套生态工具的使用
---

component是一个箭头函数返回一个import的内容，
这是异步懒加载的组件
只要要它显示的时候才会加载js文件，节省资源。
   
```js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },{
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from ,next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login'});
})

export default router

```

使用router
由于3.0中的没有this的存在，所以不能再使用`this.$router` or `this.$route`这种语法调用router相关的API, 移步详情。
在3.0中vue-router为开发者提供了两个非常常用的方法useRouter和useRoute,光看名字就知道跟2.0中的`this.$router`和`this.$route`的相对应的，下面是比较常用的用法：

## compositon api中使用时 useRouter
返回 router 实例。相当于在模板中使用 $router。必须在 setup() 中调用。

```js
/
/ html 部分
//<button @click="changeView"> 跳转路由</button>

import {useRouter} from 'vue-router'
export default {
	setup() {
    	const router = useRouter()
        const changeView = () => {
        	router.push({
            	path:'/targetPage',
                query:{name:'阿强呀'}
            })
        }
        return {
        	changeView
        }
    }
}
```

复制代码
当我们点击按钮即可跳转到响应路由。

useRoute

```js
// targetPage

import {useRoute} from 'vue-router'
import {onBeforeMount} from 'vue'

export default {
	setup() {
    	const route = useRoute()
    	onBeforeMount(() => {
        	console.log(route.query) // {name: "阿强呀"}
        })
    }
}
```

复制代码
其实使用方法挺简单的

