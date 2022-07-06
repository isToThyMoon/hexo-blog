---
title: 自己实现WSGI server
categories:
  - 01.开发学习笔记 markdown
  - 09.后端
  - 对后端概念的理解
tags:
  - 后端
date:
---

```python

------------------
# application端：

 # 1. 可调用对象是一个函数
def application(environ, start_response):

   response_body = 'The request method was %s' % environ['REQUEST_METHOD']

   # HTTP response code and message
   status = '200 OK'

   # 应答的头部是一个列表，每对键值都必须是一个 tuple。
   response_headers = [('Content-Type', 'text/plain'),
                       ('Content-Length', str(len(response_body)))]

   # 调用服务器程序提供的 start_response，填入两个参数
   start_response(status, response_headers)

   # 返回必须是 iterable
   return [response_body]

# 2. 可调用对象是一个类
class AppClass:
    """这里的可调用对象就是 AppClass 这个类，调用它就能生成可以迭代的结果。
        使用方法类似于：
        for result in AppClass(env, start_response):
             do_somthing(result)
    """

    def __init__(self, environ, start_response):
        self.environ = environ
        self.start = start_response

    def __iter__(self):
        status = '200 OK'
        response_headers = [('Content-type', 'text/plain')]
        self.start(status, response_headers)
        yield "Hello world!\n"

# 3. 可调用对象是一个实例
class AppClass:
    """这里的可调用对象就是 AppClass 的实例，使用方法类似于：
        app = AppClass()
        for result in app(environ, start_response):
             do_somthing(result)
    """

    def __init__(self):
        pass

    def __call__(self, environ, start_response):
        status = '200 OK'
        response_headers = [('Content-type', 'text/plain')]
        self.start(status, response_headers)
        yield "Hello world!\n"


-------------------

WSGI server (application sever)端
import os, sys

def run_with_cgi(application):    # application 是程序端的可调用对象
    # 准备 environ 参数，这是一个字典，里面的内容是一次 HTTP 请求的环境变量
    environ = dict(os.environ.items())
    environ['wsgi.input']        = sys.stdin
    environ['wsgi.errors']       = sys.stderr
    environ['wsgi.version']      = (1, 0)
    environ['wsgi.multithread']  = False
    environ['wsgi.multiprocess'] = True
    environ['wsgi.run_once']     = True
    environ['wsgi.url_scheme'] = 'http'

    headers_set = []
    headers_sent = []

    # 把应答的结果输出到终端
    def write(data):
        sys.stdout.write(data)
        sys.stdout.flush()

    # 实现 start_response 函数，根据程序端传过来的 status 和 response_headers 参数，
    # 设置状态和头部
    def start_response(status, response_headers, exc_info=None):
        headers_set[:] = [status, response_headers]
          return write

    # 调用客户端的可调用对象，把准备好的参数传递过去
    result = application(environ, start_response)

    # 处理得到的结果，这里简单地把结果输出到标准输出。
    try:
        for data in result:
            if data:    # don't send headers until body appears
                write(data)
    finally:
        if hasattr(result, 'close'):
            result.close()

------------------






'''
自己实现WSGI Server
既然我们知道了WSGI的规范，我们完全可以自己实现一个WSGI Server
根据这个规范，我们可以总结WSGI Server需要实现以下功能：

监听端口，接收请求
接受HTTP请求后，解析HTTP协议
根据HTTP内容，生成env参数，该参数包括HTTP，wsgi信息，可以看作是请求上下文
实现一个start_response函数，作为调用application的参数，用作application回调函数，负责http相应头

这个自己实现的WSGI Server只能支持一个请求，在之后的日子，我会再写一些教程，关于socket IO 复用 和线程池 让我们自己写server支持多请求，多并发的功能
'''
-!/usr/bin/env python
# -*# coding: utf-8 -*-
import socket
import sys
import StringIO
from app import application
from datetime import datetime

class WSGIServer(object):

    def __init__(self, server_address):
        """初始构造函数, 创建监听socket"""
        self.listen_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.listen_sock.bind(server_address)
        self.listen_sock.listen(5)
        (host, port) = self.listen_sock.getsockname()
        self.server_port = port
        self.server_name = socket.getfqdn(host)


    def set_application(self, application):
        """设置wsgi application, 供server 调用"""
        self.application = application


    def get_environ(self):
        """构造WSGI环境变量，传给application的env参数"""
        self.env = {
            'wsgi.version': (1, 0),
            'wsgi.url_scheme': 'http',
            'wsgi.errors': sys.stderr,
            'wsgi.multithread': False,
            'wsgi.run_once': False,
            'REQUEST_METHOD': self.request_method,
            'PATH_INFO': self.request_path,
            'SERVER_NAME': self.server_name,
            'SERVER_PORT': str(self.server_port),
            'wsgi.input': StringIO.StringIO(self.request_data),
        }
        return self.env


    def start_response(self, http_status, http_headers):
        """构造WSGI响应， 传给application的start_response"""
        self.http_status = http_status
        self.http_headers = dict(http_headers)
        headers = {
            'Date': datetime.utcnow().strftime('%a, %d %b %Y %H:%M:%S GMT'),
            'Server': 'WSGIServer 1.0'
        }
        self.http_headers.update(headers)


    def parse_request(self, text):
        """获取http头信息，用于构造env参数"""
        request_line = text.splitlines()[0]
        request_info = request_line.split(' ')
        (self.request_method,
        self.request_path,
        self.request_version) = request_info


    def get_http_response(self, response_data):
        """完成response 内容"""
        res = 'HTTP/1.1 {status} \r\n'.format(status=self.http_status)
        for header in self.http_headers.items():
            res += '{0}: {1} \r\n'.format(*header)

        res += '\r\n'

        res_body = ''
        for val in response_data:
            res_body += val

        res += res_body

        return res


    def handle_request(self):
        """处理请求"""
        # 初始版本，只接受一个请求
        conn, addr = self.listen_sock.accept()

        # 获取http 请求的request内容
        self.request_data = conn.recv(1024)
        self.parse_request(self.request_data)

        # 构造调用application需要的两个参数 env, start_response
        env = self.get_environ()
        start_response = self.start_response

        # 调用application, 并获取需要返回的http response内容
        response_data = self.application(env, start_response)

        # 获取完整http response header 和 body, 通过socket的sendall返回到客户端
        res = self.get_http_response(response_data)
        conn.sendall(res)

        # 脚本运行完毕也会结束
        conn.close()


def make_server(server_address, application):
    """创建WSGI Server 负责监听端口，接受请求"""
    wsgi_server = WSGIServer(server_address)
    wsgi_server.set_application(application)

    return wsgi_server


SERVER_ADDRESS = (HOST, PORT) =  '', 8124
wsgi_server = make_server(SERVER_ADDRESS, application)
wsgi_server.handle_request()

```


