---
title: WSGI Gunicorn Nginx理解和web架构流程
categories:
  - 01.开发学习笔记 markdown
  - 09.后端
  - 对后端概念的理解
tags:
  - 后端
date:
---

### 概念
nginx: web server
flask: web framework
gunicorn: application server


1. tcp byte 数据流
2. http 严格要求了， request response // 发送给web framework什么？
    in： 已经parse过的request
    out: response writer
2.  中间件
    * 对于web framework 我看起来像是一个http server
    对于http server，我看起来像是一个web framework

    1. session sessionmiddlewareinterface
    2. cache memcached
3. web framework, flask
    3.1 M mongo redis mysql
    3.2 V jinja2
    3.3 C route
4. application

-------------------

### 开发方式对比

传统  ： 传递回来一个页面
现代的方法呢： 是做成服务 访问一个网址，返回了json
1. 不同服务，可以用不用的语言
2. 拆分服务 业务里面 有一些部分很耗费性能，有一些部分不怎么耗费性能
在传统做法里面 n个app 对应不同的用户，让他访问不同的app
每个服务独立，复制的单位，是以服务为基础的 微服务，SOA,面向服务的架构

-------------------

### python web的开发组件

flask + gunicorn + supervisor + nginx

wsgi.py     给gunicorn用的
gunicorn    一个暴露在外面的web服务器
supervisor  监控gunicorn  让他持续不断运行

nginx       也是一个服务器 反向代理
一台服务器跑多个gunicorn程序 他们各自监听不同的端口
Nginx监控80端口
把80过来的请求根据配置转发给内部不同端口监听的gunicorn程序
再把gunicorn返回的数据传给客户端

用户需要上传头像 图片是静态资源 也用nginx配置起来 用gunicorn发比较慢

--------------

#### 为什么这么包装？

0.web server app
1.web server framework
2.http server
3.tcp server

nginx : http server
gunicorn: http server
wsgi: 暴露出来一个app

nginx gunicorn?
data -> nginx -> gunicorn -> wsgi -> app ?

1. 反向代理
    gunicorn 2000
    gunicorn 2002
    nginx 80
2. 负载均衡
    haproxy 去访问google.com
3. 静态文件托管
    flask里有 send_by_directory 每次都send性能很不好
    配置了一个rule，保存在nginx的缓存，不会走到app这一层
4. 缓冲
    服务器很忙 gunicorn忙不过来 暂时缓冲 等闲时再发
    traffic busy
    缓冲负载

#### redis作缓存服务器

原因：redis多机访问 存在内存的cache原来只有本身这个app可以访问 太浪费 为了让其他app也可以访问这个cache 使用redis



-------------------

#### WSGI和整体架构：

WSGI：全称是Web Server Gateway Interface，WSGI不是服务器，python模块，框架，API或者任何软件，只是一种规范，描述web server如何与web application通信的规范。server和application的规范在PEP 3333中有具体描述。要实现WSGI协议，必须同时实现web server和web application，当前运行在WSGI协议之上的web框架有Torando,Flask,Django

WSGI协议其实是定义了一种server与application解耦的规范，即可以有多个实现WSGI server的服务器，也可以有多个实现WSGI application的框架，那么就可以选择任意的server和application组合实现自己的web应用。
！！例如uWSGI和Gunicorn都是实现了WSGI server协议的服务器，
！！Django，Flask是实现了WSGI application协议的web框架，
可以根据项目实际情况搭配使用。

- WSGI协议主要包括server和application两部分：WSGI server  负责从客户端接收请求，将request转发给application，将application返回的response返回给客户端

- WSGI application   接收由server转发的request，处理请求，并将处理结果返回给server。application中可以包括多个栈式的中间件(middlewares)，这些中间件需要同时实现server与application，因此可以在WSGI服务器与WSGI应用之间起调节作用：对服务器来说，中间件扮演应用程序，对应用程序来说，中间件扮演服务器。

uwsgi：与WSGI一样是一种通信协议，是uWSGI服务器的独占协议，用于定义传输信息的类型(type of information)，每一个uwsgi packet前4byte为传输信息类型的描述，与WSGI协议是两种东西，据说该协议是fcgi协议的10倍快。

uWSGI：是一个web服务器，实现了WSGI协议、uwsgi协议、http协议等。


WSGI是一个同步接口，所以Tornado的WSGI容器是无法实现异步的。主流的选择是Gunicorn和uWSGI。



#### 请求从 Nginx 到 uWSGI（gunicorn） 到 web框架 交互：

![](http://md.summeres.site/15498789109358.jpg)

-------------------

从上面的图看得出 WSGI server (比如uwsgi） 要和 WSGI application（比如flask django ）交互，uwsgi需要将过来的请求转给django 处理，那么uWSGI 和 django的交互和调用就需要一个统一的规范，这个规范就是WSGI（Web Server Gateway Interface） ，WSGI是 Python PEP333中提出的一个 Web 开发统一规范。
  
Web 应用的开发通常都会涉及到 Web 框架（django, flask）的使用，各个 Web 框架内部由于实现不同相互不兼容，给用户的学习，使用和部署造成了很多麻烦。
  
正是有了WSGI这个规范，它约定了WSGI server 怎么调用web应用程序的代码，web 应用程序需要符合什么样的规范，只要 web 应用程序和 WSGI server 都遵守 WSGI 协议，那么，web 应用程序和 WSGI server就可以随意的组合。 比如uWSGI+django , uWSGI+flask, gunicor+django, gunicorn+flask 这些的组合都可以任意组合，因为他们遵循了WSGI规范。

WSGI 标准中主要定义了两种角色：
“WSGI server” 或 “gateway” 端
“WSGI application” 或 “framework” 端

WSGI 服务器需要调用应用程序的一个可调用对象，这个可调用对象（callable object）可以是一个函数，方法，类或者可调用的实例

WSGI 规定每个 python 程序（Application）必须是一个可调用的对象（实现了__call__ 函数的方法或者类），接受两个参数 environ（WSGI 的环境信息） 和 start_response（开始响应请求的函数），并且返回 iterable。

这里的callable object可以是一个函数 可以是一个对象，接收两个参数：
- environ：一个包含所有HTTP请求信息的dict对象
- start_response：一个发送HTTP响应的回调函数  在返回内容之前必须先调用这个回调函数
- Return的是响应的body 最后的返回结果，应该是一个可迭代对象，这里是将返回的字符串放到列表里。如果直接返回字符串可能导致 WSGI 服务器对字符串进行迭代而影响响应速度。

#### 简单实现：

```python

# WSGI application 的代码 app.py
def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b'<h1>Hello, web!</h1>']

# WSGI server 代码 WSGI_server.py
from wsgiref.simple_server import make_server
from app import application
# 启动 WSGI服务器
httpd = make_server (
    'localhost',
    9000,
    application # 这里指定我们的 application object)
)
# 开始处理请求
-httpd.handle_request()
print('Serving HTTP on port 9000...')
# 开始监听HTTP请求:
httpd.serve_forever()
命令行运行程序 启动
python3 WSGI_server.py

```

-------------------

#### Web Server(Nginx) 如何通过输入输出与 Application Server(gunicorn) 进行交互?

FastCgi协议， uwsgi协议， http协议

在构建 Web 应用时，通常会有 Web Server (nginx)和 Application Server(wsgi server eg:uwsgi) 两种角色。其中 Web Server 主要负责接受来自用户的请求，解析 HTTP 协议，并将请求转发给 Application Server，Application Server 主要负责处理用户的请求，并将处理的结果返回给 Web Server，最终 Web Server 将结果返回给用户。

由于有很多动态语言和很多种 Web Server，他们彼此之间互不兼容，给程序员造成了很大的麻烦。因此就有了 CGI/FastCGI ，uwsgi 协议，定义了 Web Server 如何通过输入输出与 Application Server 进行交互，将 Web 应用程序的接口统一了起来。

所以，nginx 和 uwsgi交互就必须使用同一个协议，而上面说了uwsgi支持fastcgi,uwsgi,http协议，这些都是nginx支持的协议，只要大家沟通好使用哪个协议，就可以正常运行了。


-------------------

将uwsgi 放在nginx后面，让nginx反向代理请求到uwsgi
uwsgi 原生支持HTTP， FastCGI， SCGI，以及特定的uwsgi协议， 性能最好的明显时uwsgi, 这个协议已经被nginx支持。
所以uwsgi 配置使用哪个协议，nginx 要使用对应协议


```
# uWSGI使用http协议
 uwsgi --http-socket 127.0.0.1:9000 --wsgi-file app.py
# nginx配置
lcation / {
  proxy_pass 127.0.0.1:9000;
}

更多协议：

[uwsgi]

# 使用uwsgi协议 socket, uwsgi-socket 都是uwsgi协议
# bind to the specified UNIX/TCP socket using default protocol
# UNIX/TCP 意思时可以UNIX: xx.sock, 或者 TCP: 127.0.0.1:9000 他们是都可以的
# UNIX 没有走TCP协议，不是面向连接, 而是直接走文件IO
# nginx 使用uwsgi_pass
 socket = 127.0.0.1:9000
 socket = /dev/shm/owan_web_uwsgi.sock
 uwsgi-socket = /dev/shm/owan_web_uwsgi.sock
# nginx 使用 uwsgi_pass   /dev/shm/owan_web_uwsgi.sock;



# 使用fastcgi协议 fastcgi-socket

# bind to the specified UNIX/TCP socket using FastCGI protocol
# nginx 就可以好象PHP那样配置 使用fastcgi_pass
 fastcgi-socket = /dev/shm/owan_web_uwsgi.sock
# nginx 使用fastcgi_pass   /dev/shm/owan_web_uwsgi.sock;



# 使用http协议 http-socket

# bind to the specified UNIX/TCP socket using HTTP protocol
# nginx 使用proxy_pass
# 原来proxy_pass 是http协议，但不一定要用TCP
# proxy_pass http://unix:/dev/shm/owan_web_uwsgi.sock;
http-socket = /dev/shm/owan_web_uwsgi.sock
# nginx 使用 proxy_pass   /dev/shm/owan_web_uwsgi.sock;

chdir = /data/web/advance_python/uwsgi/
wsgi-file = app.py
processes = 4
threads = 2
master = true
...

```

-------------------

### Gunicorn

配合使用gevent，可以获得极高的并发性能
异步非阻塞

（从Ruby下面的Unicorn得到的启发）应运而生：依赖Nginx的代理行为，同Nginx进行功能上的分离。由于不需要直接处理用户来的请求（都被Nginx先处理），Gunicorn不需要完成相关的功能，其内部逻辑非常简单：接受从Nginx来的动态请求，处理完之后返回给Nginx，由后者返回给用户。

由于功能定位很明确，Gunicorn得以用纯Python开发：大大缩短了开发时间的同时，性能上也不会很掉链子。同时，它也可以配合Nginx的代理之外的别的Proxy模块工作，其配置也相应比较简单。

Gunicorn易于配置，兼容性好，CPU消耗很少，在豆瓣使用广泛。它支持多种Worker模式，推荐的模式有如如下几种:

同步Worker：默认模式，也就是一次只处理一个请求
异步Worker：通过Eventlet、Gevent实现的异步模式
异步IO Worker：目前支持gthread和gaiohttp两种类型