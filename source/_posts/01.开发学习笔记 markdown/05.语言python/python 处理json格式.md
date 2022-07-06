---
title: python 处理json格式
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
---

Python自带有json模块。可以对python对象与json字符串进行相互转换。

```python
import json
json.dumps() # 把一个Python对象作为参数编码 返回Json字符串。

json.loads()# 把Json格式字符串解码，转换成Python对象。
```
如果你要处理的是文件而不是字符串，你可以使用 json.dump() 和 json.load() 来编码和解码JSON数据。例如：

```
# 写入 JSON 数据
with open('data.json', 'w') as f:
    json.dump(data, f)
 
# 读取数据
with open('data.json', 'r') as f:
    data = json.load(f)
```