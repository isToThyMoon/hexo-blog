---
title: flask_sqlalchemy理解整理
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 02.web开发-flask
tags:
  - 数据库
date:
---

# 标准做法：
```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app=Flask(__name__)

# 连接数据库
app.config['SQLALCHEMY_DATABASE_URI'] = '数据库类型://数据库用户名:数据库密码@数据库地址:数据库端口/数据库名字'
# 设置是否跟踪数据库的修改情况，一般不跟踪
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# 数据库操作时是否显示原始SQL语句，一般都是打开的，因为我们后台要日志
app.config['SQLALCHEMY_ECHO'] = True

# 实例化orm框架的操作对象，后续数据库操作，都要基于操作对象来完成
db = SQLAlchemy(app)

# 声明模型类
class Role(db.Model):
    __tablename__ = "my_table"    #设置表名
    id = db.Column(db.INTEGER,primary_key=True)    设置字段，以及属性
    name = db.Column(db.String(10),nullable=False)

@app.route("/")
def index():
    return "hello"

if __name__ == '__main__':
    db.create_all()    # 创建当前应用中声明的所有模型类(继承了db.Model的)对应的数据表，db.drop_all()是删除表
    app.run(debug=True)
```

实际生产环境做法：
#### __init__.py

```python

from flask import Flask
from app.models.base import db
from flask_login import LoginManager
from flask_mail import Mail

login_manager = LoginManager()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.secure')
    app.config.from_object('app.setting')
    register_blueprint(app)

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'web.login'
    login_manager.login_message = '请先登陆或注册'
    mail.init_app(app)
    # db.init_app 方法没有保存核心对象 只作临时参数 所以create_all()方法还要传入核心对象
    # 或者 让create_all 自己寻找current_app 传入
    # with app.app_context():
    #   db.create_all()
    # 或者 一开始在model中实例化db = SQLAlchemy() 时 把app 作为属性 参数传入 但是不同模块导入app实例太过麻烦
    db.create_all(app=app)
    
    return app

def register_blueprint(app):
    from app.web import web
    app.register_blueprint(web)
```

