---
title: web开发各工具配置文件设置
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
date:
---

# 以danche-be项目为例：
各软件的配置文件地址：（通过软链接的方式配置到配置文件目录下）

supervisor配置文件地址（监控管理gunicorn）：`/etc/supervisor/conf.d/*.conf`
nginx配置文件地址：`/etc/nginx/sites-enabled/*`

supervisor监控MongoDB 配置文件地址: `/etc/supervisor/conf.d/mongod.conf`
supervisor监控启动管理redis-server：`/etc/supervisor/conf.d/redis-server.conf`

gunicorn配置文件地址： /root/danche-be/bike-gunicorn.config
wsgi文件：`/root/danche-be/wsgi.py` 即后端项目的根目录下
## 建立配置文件软链接

```
# nginx
ln -s /root/danche-be/bike-nginx.conf /etc/nginx/sites-enabled/bike-nginx.conf

# supervisor
ln -s /root/danche-be/bike-gunicorn-supervisor.conf /etc/supervisor/conf.d/bike-gunicorn-supervisor.conf
```

## supervisor监控启动管理gunicorn    `/root/danche-be/bike-gunicorn-supervisor.conf`
```
[program:danche-be]
command=/root/danche-be/venv/bin/gunicorn wsgi -c bike-gunicorn.config
directory=/root/danche-be
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/root/danche-be/log/supervisor_danche-be.log
```

## wsgi文件：      /root/danche-be/wsgi.py

```python
#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import sys
from os.path import abspath
from os.path import dirname

# 设置当前目录为工作目录
# python程序中使用 import XXX 时，python解析器会在当前目录、已安装和第三方模块中搜索 xxx，如果都搜索不到就会报错
# 使用sys.path.append()方法可以临时添加搜索路径，方便更简洁的import其他包和模块。
# sys.path.insert(1, "")定义搜索路径的优先顺序，序号从0开始，表示最大优先级
# sys.path.insert()加入的也是临时搜索路径，程序退出后失效。
sys.path.insert(0, abspath(dirname(__file__)))

# 引入 app.py
import app

# 必须有一个叫做 application 的变量
# gunicorn 需要的就是这个变量
# 这个变量的值必须是 Flask 实例
# 这是规定的套路(协议)
application = app.app
```

## bike-gunicorn.config
规定WSGI server （application server）:gunicorn的绑定端口等操作 提供给gunicorn wsgi 运行来启动WSGI服务器

```python
import multiprocessing
import gevent.monkey

gevent.monkey.patch_all()

# debug = True

# log日志
loglevel = 'debug'
accesslog = "log/gunicorn_access.log"
errorlog = "log/gunicorn_debug.log"

# 意味着开启后台运行 默认为False
daemon = False

workers = multiprocessing.cpu_count() * 2 + 1
threads = multiprocessing.cpu_count() * 2
worker_class = 'gevent'

bind = '0.0.0.0:2001'
pid = '/tmp/danche-be.pid'
```

## nginx 反向代理配置
ln -s /root/danche-be/bike-nginx.conf /etc/nginx/sites-enabled/bike-nginx.conf

```
# 设计项目的api接口 转向本地代理
server {
    listen 80;

    server_name api.summeres.top;
    location / {
        proxy_pass http://localhost:2001;
    }

}

# 设计项目主静态资源
server {
    listen 80;

    server_name bike.summeres.top;
    index index.html index.htm;
    root  /root/danche-fe-d;

    #error_page   404   /404.html;
    location ~ .*\.(ico|gif|jpg|jpeg|png|bmp|swf)$
    {
        access_log   off;
        expires      1d;
    }

    location ~ .*\.(js|css|txt|xml)?$
    {
        access_log   off;
        expires      12h;
    }

    location / {
        try_files $uri $uri/ =404;
    }

}
```

## supervisor监控启动管理MongoDB     mongod.conf
```
[program:mongod]
command=/usr/bin/mongod --port 27017 --quiet --logpath /var/log/mongodb/mongod.log --logappend
autostart=true
user=root
startsecs=3                   ; number of secs prog must stay running (def. 1)
redirect_stderr=true
stdout_logfile=/var/log/mongod.log
```

## supervisor监控启动管理redis-server  redis-server.conf

```
[program:redis]
command=/usr/local/bin/redis-server /home/akirayu/redis-stable/redis.conf
directory=/var/lib/redis
user=redis
autostart=true
stopsignal=QUIT
redirect_stderr=true
stdout_logfile=/var/log/redis.log
```