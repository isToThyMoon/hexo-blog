---
title: 17.setTimeout和setInterval
categories:
  - 01.开发学习笔记 markdown
  - 06.JavaScript
  - 00.浏览器相关
---

# setTimeout

# setInterval
当你切换到其他tab时，浏览器为了节省cpu 就会延时执行setInterval 造成你js里如果有setInterval时就会有一些bug
为了解决这个bug 比如在轮播时，用了setInterval
利用visibilitychange这个事件，当页面可见时，定时器执行，当页面不可见时，定时器暂停。

```
document.addEventListener('visibilitychange', function(e){
    if(document.hidden){}
    else{}
})
```

