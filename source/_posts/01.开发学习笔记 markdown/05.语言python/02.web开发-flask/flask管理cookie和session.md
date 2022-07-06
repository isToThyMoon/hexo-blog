---
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 02.web开发-flask
---
# flask管理cookie和session
```python
from flask import session, make_response

#操作cookie
resp = make_response('dadada')
resp.set_cookie('a', '1')

#操作session 可以用flask_login库管理session 也可以手动操作
#flask_login

登录login_user(user), 写入session

退出登录logout_user(), 清除session

对需要验证登录信息的视图函数打上装饰器 @login_required

# 手动操作 如同字典一样操作 读取的时候用session.get('username')比较安全 内容不存在返回None  
#删除session:  session.pop('username')

#清除session中所有数据：session.clear
```