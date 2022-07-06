---
title: copy数组
categories:
  - 01.开发学习笔记 markdown
  - 06.JavaScript
  - 数组 字符串常见操作
---

# 不使用数组的内置方法来复制数组(都默认不能修改原数组)：

## 深拷贝：（不影响原数组）

for循环遍历

扩展运算符        arr2 = [...arr1];

arr2 = JSON.parse(JSON.stringify(arr1))  (有点局限性 但也无大碍)

# 使用数组的内置方法来深拷贝数组：

Array.slice()    const arr2 = arr1.slice();

Array.concat()   const arr2 = [].concat(arr1);

Array.from()     const arr2 = Array.from(arr1);


# 和拷贝对象结合起来看：
复制对象怎么做；

1.
利用js的合并对象方法 这种操作也叫mixin
可这种方法和for in 循环一样只能复制一层 
Object.assign() Object.assign(target, ...sources)

const person = {
   name: 'Wes Bos',
   age: 80
 };
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2); // Object {name: "Wes Bos", age: 12, number: 99}
可以看到后来的源对象的属性值，将会覆盖它之前的对象的属性。所以可以先复制 person 之后，再赋给属性新的值。

需要注意的是：这个例子里面，我们用的数组和对象都只是一层嵌套，Lodash 有一个深度复制的方法，但使用之前需要多考虑一下。

2.
JSON转换来深拷贝

3.递归