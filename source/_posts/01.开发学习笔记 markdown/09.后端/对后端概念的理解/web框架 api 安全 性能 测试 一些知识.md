---
title: web框架 api 安全 性能 测试 一些知识
categories:
  - 01.开发学习笔记 markdown
  - 09.后端
  - 对后端概念的理解
tags:
  - 后端
date:
---

## web框架 一些知识


### web框架发展历史
c语言写web    （百度曾用过 后转向php （糟糕的语言 百度 新浪等等））
perl语言写web （风靡 现已淘汰 带有大量正则表达式 可读性差）
php 糟糕 淘汰
asp c- 写web   微软推动 谁用谁死 无需关注
java           商业推进 恶心 外包推动潮流  sun公司给淘宝用java写 新浪也用java
ruby on rails  写web 国外很火 国内已经不可能流行 无需关注
Python         豆瓣 知乎 国内最大两个商业网站用此语言来写
Node.js        用javascript写的一个后端解决方案(框架) 淘宝用的多 淘宝前端多 推动js

Python
     Flask
     Django

------------------

1. 拆分有哪些页面， view 完成
2. 组织那些数据，把数据的操作实现 完成
3. 逻辑。
    3.2
    3.1
    3.3
4. 开始实现代码，部分对，部分todo
5. 剩下的部分一点点补全
6. 美化页面

------------------

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

------------------

### web 安全问题

CSRF
XSS   发JavaScript在页面获取cookies等等 执行有害代码

------------------

### JSON api
请求的form里是json 返回的也是个json
        1. 跨语言 通信格式统一 对语言约束就小
        2. 易于做成open api
        3. 客户端重度渲染


### RESTful api

Dr. Fielding
url 用资源来组织的 名词

/GET /players 拿到所有玩家
/GET /player/id 访问id的玩家的数据
/PUT /players 全量更新
/PATCH /players 部分更新
/DELETE /player/id 删除一个玩家
/GET /player/id/level


------------------


### 一. web性能 选择的并不是性能最高的语言 情况下 节省服务器

### 二. web性能组成

打开浏览器，点击百度，搜了一个query，返回了结果
那么发生了什么事情？

1. 发了一个request
2. 到达了负载均衡
3. 到达了nginx   运维关心
4. 到达了web server gunicorn web框架开发者 request解析，路由转发
5. 发送了你的web server app ： application层面要跑得快
6. web server app做了各种事情，返回了response 前端工程师

服务器处理的时间

7. ajax 动态产生一堆页面，客户端渲染（组织dom）


### 三.性能本身以后评测标准

1. 说明硬件，某种网络设备
2. 性能测试的时候切忌方法
    1. benchmark程序，已经跑满，而你的app没有跑满
    2. 多个客户端，每个客户端可能有几个链接
3. 指标 每秒处理多少个请求

框架作者喜欢测试hello world ？因为hello world本身解析请求，路由

### 四.ab这个工具 apache benchmark


测试case
1. 需要模拟有性能瓶颈的情况，topic all做一下sleep
2. 做优化的方法 cache
    a. 有一个操作很耗时，那么我们应该把结果cache，下一次就很快了
    b. cache肯定不是永久有效的，topic来说，你每次改的时候都会失效
    c. 在每次失效的时候更新cache

1. 我们用内存直接cache
2. 我们不用内存，用redis
    以前我们做cache的时候，memcached
    现在redis

1. 发现问题所在，profiling
2. 根据这个问题去做bench
3. 做cache
4. 注意安全

