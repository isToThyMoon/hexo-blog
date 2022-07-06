---
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 00.python基础学习
  - 11比wsgi更抽象高级的框架flask
---
``` python
# 在函数中返回一个包含HTML的字符串，简单的页面还可以，
# 在Python代码里拼字符串是不现实的，所以，模板技术出现了。
# 使用模板，我们需要预先准备一个HTML文档，这个HTML文档不是普通的HTML，而是嵌入了一些变量和指令，
# 然后，根据我们传入的数据，替换后，得到最终的HTML，发送给用户

# 这就是传说中的MVC：Model-View-Controller，中文名“模型-视图-控制器”。
# Python处理URL的函数就是C：Controller，Controller负责业务逻辑，比如检查用户名是否存在，取出用户信息等等；
# 包含变量{{ name }}的模板就是V：View，View负责显示逻辑，通过简单地替换一些变量，View最终输出的就是用户看到的HTML。
# Model是用来传给View的，这样View在替换变量的时候，就可以从Model中取出相应的数据。

from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('home.html')

@app.route('/signin', methods=['GET'])
def signin_form():
    return render_template('form.html')

@app.route('/signin', methods=['POST'])
def signin():
    username = request.form['username']
    password = request.form['password']
    if username=='admin' and password=='password':
        return render_template('signin-ok.html', username=username)
    return render_template('form.html', message='Bad username or password', username=username)

if __name__ == '__main__':
    app.run()

# Flask默认支持的模板是jinja2
# 在Jinja2模板中，我们用{{ name }}表示一个需要替换的变量。
# 很多时候，还需要循环、条件判断等指令语句，在Jinja2中，用{% ... %}表示指令。

```
