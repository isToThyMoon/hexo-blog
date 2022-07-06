---
title: vuex
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 04.vue基础
  - 05.配套生态工具的使用
---

vuex作为一个数据管理框架
vuex 创建了一个全局唯一的仓库，用来存放全局的数据
通过app.use() 来使用。


```js
import { createStore } from 'vuex'

export default createStore({
    state: {
        name: 'dadada'
    },
    mutations: {
        change(state, value){
            state.name = value
        }
    },
    actions: {
        change(store, value){
            this.commit('change')
            //或store.commit('change')
        }
    },
    modules: {
    }
})
```

使用时只要在组件中通过`$store`调用
`this.$store.state.name`

要在组件中修改全局store的数据，必须按流程，
第一步 在组件的逻辑中，先dispatch一个修改的action
可携带数据参数
`this.$store.dispatch('change', value)`

第二步，在store中actions里定义的change方法感知到后触发运行。

第三步，随后在acitons中this.commit触发一个mutation.

第四步，mutaiton中对应的方法执行，数据只能在这里修改`this.state.name = 'dididi'`

如果不涉及异步的修改，也可以直接在组件第一步`this.$store.commit('change', )` 然后在mutation中感知到并触发同名函数来修改，跳过第二三步

mutation里有一个约束 是不写异步代码。

如果要写 放在action中。


# composition API来使用vuex
setup无法使用this

```js
<template>
  <h1>{{name}}</h1>
</template>

<script>
import { useStore } from 'vuex';


export default {
  name: 'App',
  setup(){
      const store = useStore();
      const name = store.state.name;
      return {
          name
      }
  }
}
</script>
```
toRefs解构一下：

```js
<template>
  <h1 @click="handleClick">{{name}}</h1>
</template>

<script>
import { toRefs } from 'vue';
import { useStore } from 'vuex';


export default {
  name: 'App',
  setup(){
      const store = useStore();
      const { name } = toRefs(store.state);
      const handleClick = () =>{
          store.commit('changeName')
      }
      return {
          name
      }
  }
}
</script>
```