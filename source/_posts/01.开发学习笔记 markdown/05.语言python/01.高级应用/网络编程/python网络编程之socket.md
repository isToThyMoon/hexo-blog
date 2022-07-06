---
title: Python网络编程之socket
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 01.高级应用
  - 网络编程
tags:
  - python
date:
---

# socket介绍

Socket(中文译为套接字)是操作系统内核中的一个数据结构，它几乎是所有网络通信的基础。 Socket 和 Socket API 是用来跨网络的消息传送的，它提供了 进程间通信(IPC) 的一种形式。网络可以是逻辑的、本地的电脑网络，或者是可以物理连接到外网的网络，并且可以连接到其它网络。

网络通信，归根到底还是进程间的通信（不同计算机上的进程间通信, 又称为网络通信, IP协议进行的主要是端到端通信）。

socket使用(IP地址，协议，端口号)来标识一个进程。所以，使用端口号和网络地址的组合可以唯一的确定整个网络中的一个网络进程。

网络上的两个程序通过一个双向的通信连接实现数据的交换，这个连接的一端称为一个socket。每一个socket都用一个半相关描述{协议、本地地址、本地端口}来表示；一个完整的套接字则用一个相关描述{协议、本地地址、本地端口、远程地址、远程端口}来表示。socket也有一个类似于打开文件的函数调用，该函数返回一个整型的socket描述符，随后的连接建立、数据传输等操作都是通过socket描述符来实现的。

# 背景：
Socket 有一段很长的历史，最初是在 1971 年被用于 ARPANET，随后就成了 1983 年发布的 Berkeley Software Distribution (BSD) 操作系统的 API，并且被命名为 Berkeleysocket

当互联网在 20 世纪 90 年代随万维网兴起时，网络编程也火了起来。Web 服务和浏览器并不是唯一使用新的连接网络和 Socket 的应用程序。各种类型不同规模的客户端/服务器应用都广泛地使用着它们

时至今日，尽管 Socket API 使用的底层协议已经进化了很多年，也出现了许多新的协议，但是底层的 API 仍然保持不变

Socket 应用最常见的类型就是 客户端/服务器 应用，服务器用来等待客户端的链接。我们教程中涉及到的就是这类应用。更明确地说，我们将看到用于 InternetSocket 的 Socket API，有时称为 Berkeley 或 BSD Socket。当然也有 Unix domain sockets —— 一种用于 同一主机 进程间的通信

# Python 的 socket 模块
提供了使用 Berkeley sockets API 的接口。这将会在我们这个教程里使用和讨论到

主要的用到的 Socket API 函数和方法有下面这些：

socket()
bind()
listen()
accept()
connect()
connect_ex()
send()
recv()
close()
Python 提供了和 C 语言一致且方便的 API。我们将在下面一节中用到它们

作为标准库的一部分，Python 也有一些类可以让我们方便的调用这些底层 Socket 函数。尽管这个教程中并没有涉及这部分内容，你也可以通过socketserver模块（https://docs.python.org/3/library/socketserver.html） 中找到文档。当然还有很多实现了高层网络协议（比如：HTTP, SMTP）的的模块，可以在下面的链接中查到 Internet Protocols and Support（https://docs.python.org/3/library/internet.html）



# socket基本使用
## 1）socket函数

功能：使用给定的地址族、套接字类型、协议编号（默认为0）来创建套接字。

格式：socket.socket([family[, type[, proto]]])

参数：　　
```python
family : AF_INET (默认ipv4)，AF_INET6(ipv6) ， AF_UNIX(Unix系统进程间通信).

type : SOCK_STREAM (TCP), SOCK_DGRAM(UDP) .

protocol : 一般为0或者默认
```
备注：如果socket创建失败会抛出一个socket.error异常

## 2）服务器端函数

a）bind函数

格式：s.bind(address)

功能：将地址address绑定到套接字, 地址以元组（host,port）的形式表示。

参数：

address为元组（host,port）

host: ip地址, 为一个字符串

post: 自定义主机号, 为整型

b）listen函数

格式：s.listen(backlog)

功能：使服务器的这个端口和IP处于监听状态，等待网络中某一客户机的连接请求。如果客户端有连接请求，端口就会接受这个连接。

参数：backlog : 操作系统可以挂起的最大连接数量。该值至少为1，大部分应用程序设为5就可以了

c）accept函数

格式：s.accept()

功能：接受远程计算机的连接请求，建立起与客户机之间的通信连接。服务器处于监听状态时，如果某时刻获得客户机的连接请求，此时并不是立即处理这个请求，而是将这个请求放在等待队列中，当系统空闲时再处理客户机的连接请求。

返回值：返回一个数组（conn,address）,其中conn是新的套接字对象，可以用来接收和发送数据。address是连接客户端的地址

## 3）客户端函数

a）connect函数

格式：s.connect(address)

功能：用来请求连接远程服务器

参数：address为远程服务器地址， 格式为元组（hostname,port），如果连接出错，返回socket.error错误

b）connect_ex函数

格式：s.connect_ex(address)

备注：connect()函数的扩展版本,出错时返回出错码,而不是抛出异常

4）通用函数

a）recv函数

格式：s.recv(bufsize[,flag])

功能：接收远端主机传来的数据

参数：

bufsize : 指定要接收的数据大小

flag : 提供有关消息的其他信息，通常可以忽略

返回值：返回值为数据以字符串形式</code>

b）send函数

格式：s.send(string[,flag])

功能：发送数据给指定的远端主机

参数：

string : 要发送的字符串数据

flag : 提供有关消息的其他信息，通常可以忽略

返回值：返回值是要发送的字节数量，该数量可能小于string的字节大小。

c）sendall函数

格式：s.sendall(string[,flag])

功能：内部调用了send函数，完整发送TCP数据。将string中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。

参数：同send函数

返回值 : 成功返回None，失败则抛出异常。

d）close函数

格式：s.close()

功能：关闭套接字

e）recvfrom函数

格式：s.recvfrom(bufsize[.flag])

功能：与recv()类似，区别是返回值不同

返回值：返回一个数组（data,address），其中data是包含接收数据的字符串，address是发送数据的套接字地址。

f）sendto函数

格式：s.sendto(string[,flag],address)

功能：将数据发送到套接字

参数：

string : 要发送的字符串数据

flag : 提供有关消息的其他信息，通常可以忽略

address是形式为（ipaddr，port）的元组，指定远程地址

返回值：返回值是要发送的字节数量

备注：该函数主要用于UDP协议。

g）settimeout函数

格式：s.settimeout(timeout)

功能：设置套接字操作的超时期

参数：timeout是一个浮点数，单位是秒。值为None表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如 client 连接最多等待5s ）

h）getpeername函数

格式：s.getpeername()

功能：获取连接套接字的远程地址

返回值：返回值通常是元组（ipaddr,port）。

i）getsockname函数

格式：s.getsockname()

功能：获取套接字自己的地址

返回值：通常是一个元组(ipaddr,port)


socket中常用的函数就上面这些了。先用上面这些函数尝试TCP协议下的socket通信。


## 代码
服务器端代码如下：

```python
import socket
sk = socket.socket()
sk.bind(('127.0.0.1' ,8088))
sk.listen(5)
print('正在等待Linux公社客户端连接……')
conn , addr = sk.accept()
print('Linux公社客户端已连接到服务器……')
mes_from_client = conn.recv(1024).decode('utf-8')
print(mes_from_client)
mes_to_server = '你好，Linux公社www.linuxidc.com客户端，已收到您的信息！'.encode('utf-8')#发送的数据必须是byte类型
conn.send(mes_to_server)
conn.close()
sk.close()
```

客户端代码：

```python
import socket
sk = socket.socket()
sk.connect(('127.0.0.1',8088))
mes_to_server = '你好，Linux公社www.linuxidc.com服务器！'.encode('utf-8')#发送的数据必须是byte类型
sk.send(mes_to_server)
mes_from_server = sk.recv(1024).decode('utf-8')
print(mes_from_server)
sk.close()
```

注意：上述两代码块必须放在两不同的文件中，且必须先运行服务器代码，然后在开启客户端。开启服务器后，首先输出“正在等待客户端连接……”，然后进程会阻塞在accept函数中，下面的代码不会被执行，知道有客户端连接过来。开启客户端后，服务器端会先收到客户端发来的信息，然后客户端也会受到服务器发来的信息。

上面的例子中，服务器和客户端都是收发了一条信息后socket关闭，如果要保持连接进行长时间通信呢？那么，我们可以把收发函数放入一个“while True”循环中：

服务器端代码：

```python
import socket

BUF_SIZE = 1024  #设置缓冲区大小

server_addr = ('127.0.0.1', 8089)  #IP和端口构成表示地址

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  #生成一个新的socket对象

server.bind(server_addr)  #绑定地址

print("socket与地址绑定完成……")

server.listen(5)  #监听, 最大监听数为5

print("socket监听开始……")

client, client_addr = server.accept()  #接收TCP连接, 并返回新的套接字和地址, 阻塞函数

print("报告：有客户端请求连接，正在连接……")

print('客户端地址为：{}'.format( client_addr))

while True :

    mes_from_client = client.recv(BUF_SIZE)  #从客户端接收数据

    mes = mes_from_client.decode('utf-8')

    print('客户端说：{}'.format(mes))

    mes = input('回复客户端的信息>')

    mes_to_client = mes.encode('utf-8')

    client.sendall(mes_to_client)  #发送数据到客户端

server.close()

客户端代码：

import socket

BUF_SIZE = 1024  #设置缓冲区的大小

server_addr = ('127.0.0.1', 8089)  #IP和端口构成的服务器地址

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)  #返回新的socket对象

client.connect(server_addr)  #连接服务器

while True:

    mes = input("发送给服务器的信息> ")

    mes_to_server = mes.encode('utf-8')

    client.sendall(mes_to_server)  #发送数据到服务器

    mes_from_server = client.recv(BUF_SIZE)  #从服务器端接收数据

    mes = mes_from_server.decode('utf-8')

    print(mes)

client.close()

```
