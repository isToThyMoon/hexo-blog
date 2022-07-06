---
title: linux中supervisor使用
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
---
# 介绍
1.supervisor只能监控前台程序， 如果你的程序是通过fork方式实现的daemon服务，则不能用它监控，否则`supervisorctl status` 会提示：`BACKOFF  Exited too quickly (process log may have details)。` (这个我的使用情况踩雷主要在监控gunicorn时踩到，使用了supervisor就一定不要把gunicorn的配置daemon设为true)

2.安装完成后，可以使用两个命令，分别是 supervisord 和 supervisorctl,如果你的系统里有两个版本的 Python，且默认的 python 命令版本是 Python 3,此时运行会出错，解决方式是修改两个命令使用的 Python 版本。使用 which 命令`which supervisord`找到两个命令的文件地址，然后编辑这个文件`vim /usr/bin/supervisord`并指定 Python 版本：
```
#！/usr/bin/python2.7    这里是要指明具体版本的软连接或执行文件
```
这里的情况通用于系统内部有多个python版本时导致的包或者app调用python错误
因为一般来说，命令文件中的`#！/usr/bin/python`指意是使用/usr/bin/python这个对应的pyhton执行自身这个命令文件。
/usr/bin/python就是指向系统默认的python版本，我们可以修改软链接让它指向python2或者pyhton3。当然当我们修改它指向自己的python3版本后，supervisord这样的命令文件中仍然指明`#！/usr/bin/python`调用，当然报错。
稳妥的办法就是修改它`#！/usr/bin/python2.7`指向bin中的python2.7，无论`/usr/bin/python`软链接指向`/usr/bin/python2.7`还是自己安装的python3.7`/usr/bin/python3`都不会影响类似supervisord这样程序的执行。

# supervisorctl 操作
supervisorctl 是 supervisord 的命令行客户端工具，使用的配置和 supervisord 一样，这里就不再说了。下面，主要介绍 supervisorctl 操作的常用命令：

输入命令 supervisorctl 进入 supervisorctl 的 shell 交互界面（还是纯命令行），就可以在下面输入命令了。：

help # 查看帮助
status # 查看程序状态
stop program_name # 关闭 指定的程序
start program_name # 启动 指定的程序
restart program_name # 重启 指定的程序
tail -f program_name # 查看 该程序的日志
update # 重启配置文件修改过的程序（修改了配置，通过这个命令加载新的配置)
也可以直接通过 shell 命令操作：

supervisorctl status

停止某一个进程，program_name 为 [program:x] 里的 x：
`supervisorctl stop program_name`

停止全部进程，注：start、restart、stop 都不会载入最新的配置文件：
`supervisorctl stop all`

启动某个进程：
`supervisorctl start program_name`

重启某个进程：
`supervisorctl restart program_name`

载入最新的配置文件，停止原有进程并按新的配置启动、管理所有进程：
`supervisorctl reload`

根据最新的配置文件，启动新配置或有改动的进程，配置没有改动的进程不会受影响而重启：
`supervisorctl update`


# 配置讲解：
Supervisor 配置
Supervisor 是一个 C/S 模型的程序，supervisord 是 server 端，supervisorctl 是 client 端。

## supervisord
下面介绍 supervisord 配置方法。supervisord 的配置文件默认位于 /etc/supervisord.conf，内容如下）：

```
# supervisor config file

[unix_http_server]
file=/var/run/supervisor.sock # (the path to the socket file) UNIX socket 文件，supervisorctl 会使用
chmod=0700                   # sockef file mode (default 0700) socket 文件的 mode，默认是 0700

[supervisord]
logfile=/var/log/supervisor/supervisord.log # (main log file#default $CWD/supervisord.log) 日志文件，默认是 $CWD/supervisord.log
pidfile=/var/run/supervisord.pid    # (supervisord pidfile#default supervisord.pid) pid 文件
childlogdir=/var/log/supervisor     # ('AUTO' child log dir, default $TEMP)

# the below section must remain in the config file for RPC
# (supervisorctl/web interface) to work, additional interfaces may be
# added by defining them in separate rpcinterface: sections
[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///var/run/supervisor.sock # use a unix:// URL  for a unix socket 通过 UNIX socket 连接 supervisord，路径与 unix_http_server 部分的 file 一致

# 在增添需要管理的进程的配置文件时，推荐写到 `/etc/supervisor/conf.d/` 目录下，所以 `include` 项，就需要像如下配置。
# 包含其他的配置文件
[include]
files = /etc/supervisor/conf.d/*.conf # 引入 `/etc/supervisor/conf.d/` 下的 `.conf` 文件
```

## program 配置
program 的配置文件就写在 supervisord 配置中 include 项的路径下：`/etc/supervisor/conf.d/`，然后 program 的配置文件命名规则推荐：app_name.conf
/etc/supervisor/conf.d/*.conf
```
# 进程的配置样例
# 设置进程的名称，使用 supervisorctl 来管理进程时需要使用该进程名，这里的进程名是 your_program_name
[program:your_program_name] 
#numprocs=1                 # 进程数量，默认为1
#process_name=%(program_name)s   # 默认为 %(program_name)s，即 [program:x] 中的 x
directory=/home/yiming # 执行 command 之前，先切换到工作目录
command=python test.py
autostart=true #如果设置为true，当supervisord启动的时候，进程会自动重启。
user=yiming                 # 使用 yiming 用户来启动该进程
autorestart=true   # 程序崩溃时自动重启，重启次数是有限制的，默认为3次
startsecs = 5        # 启动 5 秒后没有异常退出，就当作已经正常启动了           
redirect_stderr=true        # 错误日志重定向到标准输出
loglevel=info
```
或
```

[program:app] # 程序名称，在 supervisorctl 中通过这个值来对程序进行一系列的操作
autorestart=True      # 程序异常退出后自动重启
autostart=True        # 在 supervisord 启动的时候也自动启动
redirect_stderr=True  # 把 stderr 重定向到 stdout，默认 false
environment=PATH="/home/app_env/bin"  # 可以通过 environment 来添加需要的环境变量，一种常见的用法是使用指定的 virtualenv 环境
command=python server.py  # 启动命令，与手动在命令行启动的命令是一样的
user=ubuntu           # 用哪个用户启动
directory=/home/app/  # 程序的启动目录
stdout_logfile_maxbytes = 20MB  # stdout 日志文件大小，默认 50MB
stdout_logfile_backups = 20     # stdout 日志文件备份数
# stdout 日志文件，需要注意当指定目录不存在时无法正常启动，所以需要手动创建目录（supervisord 会自动创建日志文件）
stdout_logfile = /data/logs/usercenter_stdout.log

```

现在以守护进程的方式启动 test.py：

`supervisord -c /etc/supervisor/supervisord.conf`

此时命令 python test.ty 已经被执行，因为进程配置样例中有 autostart=true，所以 Supervisord 服务运行后启动进程 your_program_name ，并把 your_program_name 进程作为自己的子进程，所以当进程 your_program_name 挂掉后，Supervisord 会收到通知，然后可以再次将 your_program_name 作为子进程启动

需要注意：

用 supervisord 管理时，gunicorn 的 daemon 选项需要设置为 False
如果启动命令需要包含workon，修改environment参数： 
`environment=PATH="/home/username/.virtualenvs/myproject/bin"`



