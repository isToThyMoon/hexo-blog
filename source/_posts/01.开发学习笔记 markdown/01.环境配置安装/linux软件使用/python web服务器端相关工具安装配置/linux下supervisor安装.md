---
title: linux下supervisor安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
date:
---

# 安装
~~supervisor只运行在python2.4以上，所以安装时要在系统pyhton为2版本下执行：`apt-get install supervisor`
会被安装在：`/usr/lib/python2.7/dist-packages/supervisor`
配置文件默认在：`/etc/supervisor/conf.d`
可以看到，它其实是pyhton2的一个包~~
~~sudo service supervisor start~~
~~service supervisor restart
service nginx restart
service mongodb start~~


也可以通过 `pip3 install supervisor` 进行安装，但是需要手动启动，然后设置为开机启动
注意 4.0版本现在已经支持python3.4及以后版本 不用考虑那么多，直接在python3下用pip3安装supervisor

安装完成后的基本操作：
supervisorctl status
supervisorctl update
supervisorctl reload

重启supervisor子程序
`supervisorctl restart todo  (todo是conf里设置的program名)`

## 安装位置
安装kcptun时python2安装了supervisor4.0在：
/usr/local/lib/python2.7/dist-packages/supervisor/

用pip3安装

supervisor配置文件地址（监控管理gunicorn）：`/etc/supervisor/conf.d/*.conf`

配置文件：
```
[program:kcptun]
user=kcptun
directory=/usr/local/kcptun
command=/usr/local/kcptun/server_linux_amd64 -c "/usr/local/kcptun/server-config.json"
process_name=%(program_name)s
autostart=true
redirect_stderr=true
stdout_logfile=/var/log/kcptun/server.log
stdout_logfile_maxbytes=1MB
stdout_logfile_backups=0
```

实测发现安装pip3 install supervisor 安装位置在：
`/usr/local/lib/python3.5/dist-packages/supervisor`
而supervior的启动可执行文件在 `/usr/local/bin`里