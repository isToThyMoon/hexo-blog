---
title: linux下nginx安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - nginx
date:
---

# 安装nginx
`apt-get install nginx`

## 配置nginx
首先使用命令确认Nginx配置文件所在位置,使用命令如下:
`sudo nginx -t`

一般得到正确返回：

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

一般安装好的文件位置：

```
/usr/sbin/nginx：主程序
/etc/nginx/nginx.conf：存放配置文件 （重要）
/usr/share/nginx：存放静态文件
/var/log/nginx：存放日志
```

