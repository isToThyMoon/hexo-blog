---
title: mysql连接测试
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 00.python基础学习
  - 12数据库
---

``` python
# 导入MySQL驱动:
# coding=utf-8
import mysql.connector
# 注意把password设为你的root口令:
conn = mysql.connector.connect(user='root', password='0621', database='test')
cursor = conn.cursor()
# 创建user表:
cursor.execute('create table masters1 (id varchar(20) primary key, name varchar(20))')
# 插入一行记录，注意MySQL的占位符是%s:
cursor.execute('insert into masters1 (id, name) values (%s, %s)', ['1', 'Michael'])
print(cursor.rowcount)
# 提交事务:
conn.commit()
cursor.close()
# 运行查询:
cursor = conn.cursor()
cursor.execute('select * from masters1 where id = %s', ('1',))
values = cursor.fetchall()
print(values)
# 关闭Cursor和Connection:
cursor.close()
conn.close()
```

