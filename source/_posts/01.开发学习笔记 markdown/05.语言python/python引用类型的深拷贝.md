---
title: python引用和拷贝
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
---

## python引用和拷贝

引用类型
[] {}

深拷贝 浅拷贝

浅拷贝
l1 = []
l2 = l1      # l2是l1引用
l1.append(1)
print(l2)   # l2也改变了

如果我们希望l1 l2的内存都是自己的：
from copy import deepcopy
l1 = []
l2 = deepcopy(l1)
l1.append(1)
print(l2)
这样l1 l2是独立的

下面这种方法 只拷贝了第一层 第二层的[1,2]还是会随着l1 改变而改变
l1 = [1, [1, 2], 3]
l2 = l1[:]


```python

def foo(a=[]):    默认参数陷阱
    a.append(1)
    print(a)
    
foo()
foo()
得到结果是
[1]
[1,1]   这里的a = []其实是一个引用 第一次foo()被创建出来 第二层调用还是它

```

