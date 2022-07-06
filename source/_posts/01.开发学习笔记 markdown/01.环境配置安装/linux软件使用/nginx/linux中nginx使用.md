---
title: linux中nginx使用
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - nginx
date:
---

# 操作命令
nginx 和它模块的工作方式是在配置文件中写好的。
/etc/nginx/nginx.conf：存放配置文件

启动Nginx服务  `service nginx start`
停止  `service nginx stop`
重启  `service nginx restart`
重启使配置生效 `nginx -s reload`
测试Nginx服务器  `wget http://127.0.0.1` 能正常获取inde.html文件说明Nginx安装成功
重启nginx以加载配置文件 `nginx -s reload`

## 启用，停止和重载配置
运行可执行文件就可以开启 nginx，比如:

-c 为 nginx 的配置文件
nginx -c /usr/local/nginx/conf/nginx.conf

如果，nginx 已经开启，那么它就可以通过使用 -s 参数的可执行命令控制。使用下列格式：
nginx -s signal
signal 可以为下列命令之一：
stop — 直接关闭 nginx
quit — 会在处理完当前正在的请求后退出，也叫优雅关闭
reload — 重新加载配置文件，相当于重启
reopen — 重新打开日志文件

# 访问出现404 
1.查看log信息是blog内的文件访问权限被禁止
尝试更改文件夹的访问权限 chmod -R 777

2.尝试修改nginx 启动用户
查看nginx的启动用户，发现是nobody，而不是用root启动的
只有root用户可以只用1024以下的端口

ps aux | grep "nginx: worker process" | awk '{print $1}'

将nginx.config的user改为和启动用户一致，
设置user为root
