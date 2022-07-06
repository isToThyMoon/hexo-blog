---
title: brew安装nginx
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
  - mac中brew的使用
---

```
brew install nginx
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/bottles/nginx-1.15.11.mojave.
######################################################################## 100.0%
==> Pouring nginx-1.15.11.mojave.bottle.tar.gz
==> Caveats
Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
```

配置文件在/usr/local/etc/nginx/nginx.conf。
启动命令是brew services start nginx。


启动 并用brew管理nginx开机自启动
```
brew services restart nginx
==> Tapping homebrew/services
Cloning into '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-services'...
remote: Enumerating objects: 14, done.
remote: Counting objects: 100% (14/14), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 14 (delta 0), reused 7 (delta 0), pack-reused 0
Unpacking objects: 100% (14/14), done.
Tapped 1 command (43 files, 59.2KB).
==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
```