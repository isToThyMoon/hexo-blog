---
title: shell翻墙
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - shell
---

github在国内被墙 而在命令行里无论是否开梯子都没有代理 
所以curl要加-x 127.0.0.1:1087 http代理
如：
bash -c "$(curl -fsSL -x 127.0.0.1:1087  https://raw.githubusercontent.com/xzhih/one-key-hidpi/master/hidpi.sh)"

或者直接让终端翻墙：
在终端中直接运行命令
export http_proxy=http://127.0.0.1:1087
export https_proxy=http://127.0.0.1:1087
这个办法的好处是简单直接，并且影响面很小（只对当前终端有效，退出就不行了）。

如果你用的是ss代理，在当前终端运行以下命令，那么wget curl 这类网络命令都会经过ss代理
export all_proxy=socks5://127.0.0.1:1086
也可以写进bashrc文件 每次开机就生效

或者写alias 每次按需手动开关：

```
# 开启控制台翻墙
alias proxy='export all_proxy=socks5://127.0.0.1:1086'
alias unproxy='unset all_proxy'

或http代理
alias proxy='export http_proxy=http://127.0.0.1:1087; https_proxy=http://127.0.0.1:1087'
alias unproxy='unset http_proxy; unset https_proxy'
```

# 检测是否成功
curl cip.cc 此命令会callback此刻你的访问ip 定位 服务商信息
如果成功翻墙 应当callback你的vps的所在地和ip