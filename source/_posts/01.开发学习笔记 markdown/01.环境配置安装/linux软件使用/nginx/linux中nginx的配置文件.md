---
title: linux中nginx的配置文件
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - nginx
date: 2020/3/17
---

# 配置文件
nginx 是由一些模块组成，我们一般在配置文件中使用一些具体的指令来控制它们。指令被分为简单指令和块级命令。一个简单的指令是由名字和参数组成，中间用空格分开，并以分号结尾。例如：

// 简单指令
root /data/www;
// 块级指令
块级指令和简单指令一样有着类似的结构，但是末尾不是分号而是用 {} 大括号包裹的额外指令集。如果一个块级指令的大括号里有其他指令，则它被叫做一个上下文（比如：events，Module ngx_http_core_module，server，和 location）。 在配置文件中，没有放在任何上下文中的指令都是处在主上下文中。events 和 http 的指令是放在主上下文中，server 放在 http 中, location 放在 server 中。

## 作静态服务器
一个重要的网络服务器的任务是处理文件（比如图片或者静态 HTML 文件）。这里，你会实践一个例子，文件会从不同的目录中映射（取决于请求）：/data/www（放置 HTML 文件）和 /data/images（放置图片）。这需要配置一下文件，将带有两个 location 的指令的 server 的块级命令放在 server 指令中。 首先，创建一个 /data/www目录，然后放置一个事先写好内容的 index.html 文件。接着，创建一个 /data/images 目录，然后放置一些图片。 下一步，打开配置文件。默认的配置文件已经包含了一些关于 server 指令的样式，大多数情况下直接把他们给注释掉。现在，注释掉其他的区块，然后写一个新的 server 区块：
```
http {
    server {
    }
}
```
通常，该配置文件可能会包含多个 server 指令。这些 server 指令监听不同的端口和服务器名。一旦 nginx 决定哪个服务进程处理请求，它会根据在 server 块级指令中定义好的 location 指令的参数，来匹配请求头中指定的 URI。 将下列 location 指令添加到 server 指令中：
```
location / {
    root /data/www;
}
```
该 location 指令相对于请求中的 URI 执行了 “/” 的前缀。为了匹配请求，URI 会被添加到 root 命令指定的路径后，即 /data/www，得到本地文件系统中请求文件的路径。如果，有几个 location 匹配到，那么 nginx 会选择最长的前缀(最详细的地址)。上面的 location 提供了长度为 1 的前缀，所以，仅当其他的 location 匹配失败后，该指令才会使用。 接着，添加第二个 location 区块：
```
location /images/ {
    root /data;
}
```
它会匹配到以 /images/ 开头的请求（location / 也会匹配到该请求，只是前缀更短） server 块级命令的配置结果如下：
```
server {
    location / {
        root /data/www;
    }

    location /images/ {
        root /data;
    }
}
```
这已经是一个可用的服务器配置，它监听标准的 80 端口并且可以在本地上通过 http://localhost/ 访问。对于 URI 以 /images/ 开头的请求，服务器会从 /data/images 目录中，返回对应的文件。例如，nginx 会返回 /data/images/example.png 文件，当接收到 http://localhost/images/example.png 的请求响应时。如果该文件不存在，nginx 会返回一个 404 错误的响应。没有以 /images/ 开头的 URI 的请求，将会直接映射到 /data/www 目录中。比如，响应 http://localhost/some/example.html 的请求，nginx 会发送 /data/www/some/example.html 文件。 为了使用新的配置文件，如果还没开启 nginx 需要先开启，然后将重载信号发送给 nginx 的主进程，通过执行：
`nginx -s reload`
如果你发现有些地方出了问题，你可以在 /usr/local/nginx/logs 或者 /var/log/nginx 目录下的 access.log 和 error.log 文件中，找到原因。

## 示例：
每个指令必须有分号结束
```
#user administrator administrators;  #配置用户或者组，默认为nobody nobody。
#worker_processes 2;  #允许生成的进程数，默认为1
#pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;  #制定日志路径，级别。这个设置可以放入全局块，http块，server块，级别以此为：debug|info|notice|warn|error|crit|alert|emerg
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    #use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
http {
    include       mime.types;   #文件扩展名与文件类型映射表
    default_type  application/octet-stream; #默认文件类型，默认为text/plain
    #access_log off; #取消服务日志
    log_format myFormat '$remote_addr–$remote_user [$time_local] $request $status $body_bytes_sent $http_referer $http_user_agent $http_x_forwarded_for'; #自定义格式
    access_log log/access.log myFormat;  #combined为日志格式的默认值
    sendfile on;   #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块。
    sendfile_max_chunk 100k;  #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限。
    keepalive_timeout 65;  #连接超时时间，默认为75s，可以在http，server，location块。

    upstream mysvr {
      server 127.0.0.1:7878;
      server 192.168.10.121:3333 backup;  #热备
    }
    error_page 404 https://www.baidu.com; #错误页
    server {
        keepalive_requests 120; #单连接请求上限次数。
        listen       4545;   #监听端口
        server_name  127.0.0.1;   #监听地址
        location  ~*^.+$ {       #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。
           root path;  #根目录
           index vv.txt;  #设置默认页
           proxy_pass  http://mysvr;  #请求转向mysvr 定义的服务器列表
           deny 127.0.0.1;  #拒绝的ip
           allow 172.18.5.54; #允许的ip
        }
    }
}
```

## 配置单车项目的实例
```
# 设计项目的api接口 转向本地代理
server {
    listen 443;

    server_name  api.summeres.site;
    location / {
        proxy_pass http://localhost:2001;
    }

    ssl on;
    ssl_certificate  cert/api.summeres.site.pem;
    ssl_certificate_key cert/api.summeres.site.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

}

# 设计项目主静态资源
server {
    listen 443;

    server_name summeres.site;
    index index.html index.htm;
    root  /path/bike;

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

    ssl on;
    ssl_certificate  /etc/nginx/cert/www.summeres.site.pem;
    ssl_certificate_key /etc/nginx/cert/www.summeres.site.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

}

# 设计项目80口转发443
server {

    listen 80;
    server_name summeres.site;
    rewrite ^(.*)$ https://$host$1 permanent;

}

# 博客 重定向到国外
server {
    listen 443;

    server_name www.summeres.site;
    rewrite ^(.*)$ http://summeres.top$1;

    ssl on;
    ssl_certificate  /etc/nginx/cert/www.summeres.site.pem;
    ssl_certificate_key /etc/nginx/cert/www.summeres.site.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

}

# 博客80口 重定向到国外
server {

    listen 80;
    server_name www.summeres.site;
    rewrite ^(.*)$ http://summeres.top$1;

}
```