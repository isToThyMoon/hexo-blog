---
title: array api 精简
categories:
  - 01.开发学习笔记 markdown
  - 06.JavaScript
  - 数组 字符串常见操作
---

## array.filter(func) 
对每一项运行func 筛出使函数运行返回 true 的项组成新数组返回。

## array.map(func) 
对每一项运行func 把数组中的每个元素进行处理后，返回一个新的数组。

## array.sort((a, b) => (a > b) ? 1 : -1) 
数组以字符串的形式进行升序排列。原地排序。
按照调用该函数的返回值排序。
如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变；
如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前；

## array.reduce
```js
array.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
}) 
```
归并数组，接受一个函数作为参数（这个函数可以理解成累加器），它会遍历数组的所有项，然后构建一个最终的返回值，
这个值就作为个累加器的第一个参数。

## array.some(func) 
直到某个数组元素使此函数为 true，就立即返回 true。所以可以用来判断一个数组中，是否存在某个符合条件的值。

## array.every(func) 
除非所有值都使此函数为 true，才会返回 true 值，否则为 false。主要用处，即判断是否所有元素都符合条件。

## find(func) 和 fineIndex(func)
ES6 的新特性 类似于 some() ，但对于符合条件的元素，返回值不是布尔类型。
不一样的地方在于，find() 返回的是这个元素的值（或 undefined），而 findIndex() 返回的是这个元素的索引（或 -1）。


## slice 和 splice
这两者比较相似的地方，大概只有：参数的第一个都是指的起始位置，且都接受负数，若是负数，代表倒数第几位。

而其他地方是需要区分清楚的：
slice()：不修改原数组，按照参数复制一个新数组，参数表述复制的起点和终点索引（省略则代表到末尾），但终点索引位置的元素不包含在内。
splice()：原数组会被修改。第二个参数代表要删掉的元素个数，之后可选的参数，表示要替补被删除位置的元素。返回被删除的元素。

所以想要删除一个元素，有两种实现思路，一是把出它之外的元素给复制下来再合在一起，二是直接把它删除。

```js
// 删除方法一，splice()
// comments.splice(index, 1);

// 删除方法二，slice 后拼接
const newComments = [
    ...comments.slice(0, index),
    ...comments.slice(index + 1)
];
```