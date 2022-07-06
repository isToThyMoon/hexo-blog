---
title: linux下gunicorn安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
---


### 安装 Gunicorn
20.0.0版本开始取消支持python2 最新需要3.5以上
**

Gunicorn 应该装在你的 virtualenv 环境下 安装前记得激活 venv

安装完是在虚拟环境的bin目录下 supervisor的控制文件中gunicorn的路径应该填写这个虚拟环境的路径/var/www/danche-be/venv/bin/gunicorn

`(venv) $ pip install gunicorn`

在虚拟环境venv下：
`$which gunicorn`

`/var/www/bike-web/venv/bin/gunicorn`

运行 Gunicorn
`(venv) $ gunicorn -w 4 -b 127.0.0.1:8080 wsgi:application`


如果搞不清楚gunicorn 的安装路径，可用 find / -name 'gunicorn' 命令查找。
```
$find / -name 'gunicorn'
/run/gunicorn
/etc/logrotate.d/gunicorn
/etc/init.d/gunicorn

/var/www/bike-web/venv/lib/python3.7/site-packages/gunicorn
/var/www/bike-web/venv/bin/gunicorn

/var/log/gunicorn
```


### 错误的路：
如果不是在虚拟环境安装 gunicorn：
`apt install gunicorn`
gunicorn 的安装路径： /usr/local/bin/gunicorn
find命令搜索一下  发现gunicorn版本非常混乱 
```
/usr/lib/python2.7/dist-packages/gunicorn
/usr/bin/gunicorn
/usr/share/doc/gunicorn
/usr/local/lib/python3.5/dist-packages/gunicorn
/usr/local/bin/gunicorn  ！！！！！！！！！！！
/run/gunicorn
/etc/logrotate.d/gunicorn
/etc/init.d/gunicorn
/var/log/gunicorn
```

### 配置文件
注意： 使用supervisor来监控gunicorn时，gunicorn的配置文件 gunicorn.config中daemon不能为True

```python
import multiprocessing
import gevent.monkey

gevent.monkey.patch_all()

# debug = True

# log日志
loglevel = 'debug'
accesslog = "log/access.log"
errorlog = "log/debug.log"

# 意味着开启后台运行 默认为False
daemon = False

workers = multiprocessing.cpu_count() * 2 + 1
threads = multiprocessing.cpu_count() * 2
worker_class = 'gevent'

bind = '0.0.0.0:2001'
pid = '/tmp/danche-be.pid'
```




安装信息：
Successfully installed gunicorn-19.9.0



gunicorn wsgi --bind 0.0.0.0:2001

pstree -ap|grep gunicorn
重启Gunicorn任务
按照官方的推荐方法，很容易执行命令：
kill -HUP 30080

 退出Gunicorn任务
kill -9 30080