---
title: yield实现协程 异步IO
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 00.python基础学习
  - 13异步IO 协程
---

# 通过yield实现协程：

## 为什么使用协程（coroutine）？
进程是操作系统分配资源的最小单元, 线程是操作系统调度执行的最小单元。一个应用程序至少包括1个进程，而1个进程包括1个或多个线程。
由于进程启动切换的开销比较大，使用多进程的时候会导致大量内存空间被消耗，而如果使用多线程编程，虽然同一进程下的线程切换的开销小，但由于Python中GIL锁的存在，某个线程想要执行必须先拿到GIL，并且在一个python进程中GIL只有一个。所以在python开发中无论有cpu多少核，同时只能执行一个线程。
GIL锁的释放逻辑是当前线程遇见IO操作或者ticks计数达到100时进行释放。python3后GIL改为使用计时器，当执行时间达到阈值释放GIL锁。那么如果程序是CPU密集型的代码，无论是GIL锁采用ticks计数还是计时器计时来释放都必然造成CPU相较计算任务的负载而言，更频繁的处在线程的切换中，所以python的多线程编程对IO密集型代码更加友好。如果是CPU密集型的任务，更应该采用多进程编程。
协程相对多线程而言则只使用一个线程，将一个线程分解成为多个“微线程”，在一个线程中规定某个代码块的执行顺序，按逻辑来回切换执行代码块，通过yield人为的实现并发处理。即完成了任务也没有多线程切换的耗时，适用于有大量IO操作的代码。
python实现协程主要通过生成器的yield逻辑，或者在生产环境中一般采用第三方模块greenlet和gevent，功能强大，更易于理解。
那么对于不易于理解的yield实现协程的方法。

## 首先理解generator内的魔法方法：
生成器可以：
通过yield 暂停执行和向外返回数据。Python的yield不但可以返回一个值，它还可以接收调用者通过send发出的参数
外部通过send()向生成器内发送数据
外部通过throw()向生成器内抛出异常以便随时终止生成器的运行

1式：`n = yield r`：
yield暂停本函数的执行，接收c.send(n)传来的值 n， 赋值给等号左边，同时把r的值返回给调用者send()/next() 

2式：`r = c.send(n)`：
c.send(n)传值给yield，参数是n，启动生成器，并调用yield ，得到1式返回的值r  赋值给等号左边。  
其实是互相传值

**外部启动生成器，生成器执行上文->执行yield所在语句->中断**
**下一次启动，如果是send（）而非next（）启动：执行send（）->跳转到生成器，这里的send发送的值会覆盖上一条yield执行时对n的赋值 -> 执行下文 -> 执行下一条yield语句 -> 中断（等待下一次send或next调用）**
## 具体以廖大的“生产者消费者问题”代码为例：

```python

def consumer():                                    #1
    r = ''                                         #2
    while True:                                    #3
        n = yield r                                #4
        if not n:                                  #5
            return                                 #6
        print('[CONSUMER] Consuming %s...' % n)    #7
        r = '200 OK'                               #8
                                                   #9
                                                   #10
def produce(c):                                    #11
    c.send(None)                                   #12
    n = 0                                          #13
    while n < 5:                                   #14
        n = n + 1                                  #15
        print('[PRODUCER] Producing %s...' % n)    #16
        r = c.send(n)                              #17
        print('[PRODUCER] Consumer return: %s' % r)#18
    c.close()                                      #19
                                           

c = consumer()                                     #22
produce(c)                                         #23

```

理解代码：
* line 22-23：创建生成器c，作为参数传入produce函数运行
* line 12：c.send(None) 调用yield，向生成器c内发送数据，也就是参数None
* line 4-6：跳转到consumer函数；yield得到发送来的值None 赋值给n，n为None；返回r =' '  给调用者“c.send(None)” ；中断此次consumer函数；
* line 13 - 17：跳转到produce函数； n = 1；打印“Producing 1...” ；r = c.send(n) 发送n = 1 给生成器c；

“注意 send和next不同之处在于：send函数带有一个参数，这个参数会覆盖consumer里上一个yield语句收到的n的值 就是第四行n这里不再是None而是1”

* 跳转到consumer函数，从第五行开始执行，此时n = 1，经过第五行if判断，打印“Consuming 1...”； r = '200 OK'；回到循环体开头，执行第四行yield语句，返回r = '200 OK'  n= yield r n值没有改变 仍然是1；中断此次consumer函数；第17行r值接收返回值变为'200 OK'；
* line 18：跳转到produce函数；打印 Consumer return: 200 OK  回到循环体头部
* line 15 - 17： n = 2，打印 Producing 2...  执行r = c.send(n) 发送n = 2 到生成器c
* line 5：跳转到consumer函数，从上一个yield的下一条代码执行，n值被line 17 send函数发送改写成2；打印  Consuming 2...； r = '200 OK'；回到循环体开头，执行第四行yield语句，返回r值给line 17的send函数，line 4的 n值不变，仍然是2；中断此次consumer函数
* line 17：跳转到produce函数；打印  Consumer return: 200 OK；
重复上述循环······

至于在web编程中利用 gevent 配合 wsgi 服务器如 gunicorn 提高并发性能，可以通过 gevent 库配置。

执行结果：

```
[PRODUCER] Producing 1...
[CONSUMER] Consuming 1...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 2...
[CONSUMER] Consuming 2...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 3...
[CONSUMER] Consuming 3...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 4...
[CONSUMER] Consuming 4...
[PRODUCER] Consumer return: 200 OK
[PRODUCER] Producing 5...
[CONSUMER] Consuming 5...
[PRODUCER] Consumer return: 200 OK
```
