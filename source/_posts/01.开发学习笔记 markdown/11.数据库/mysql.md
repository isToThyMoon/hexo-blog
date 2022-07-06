---
title: mysql
categories:
  - 01.开发学习笔记 markdown
  - 11.数据库
---

navicat for mysql



 查询多条数据返回json：
 
```python

res =  db.session.query(Article).all()
temp = []
for x in res:
    temp.append(x.to_json())

jsonify(objects = temp)

```
mysqldump -h47.101.187.60 -uroot -pmysql0621 --databases bike > /Users/ayrikiya/Desktop/bike.bak