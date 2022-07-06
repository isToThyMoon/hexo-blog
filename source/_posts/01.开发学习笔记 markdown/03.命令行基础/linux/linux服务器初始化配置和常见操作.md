---
title: linux服务器初始化配置
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - linux
tags: linux
date:
---

## 服务器中文编码问题
编辑下面的文件, 不要拼错
`vim /etc/environment`
加入下面的内容, 保存退出

```
LC_CTYPE="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
```

## 更换下apt-get的默认源
编辑源文件 vim /etc/apt/sources.list

清华源：
```
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse
```

```
sudo apt-get update
sudo apt-get upgrade
```


## 安装 配置 打开 ufw 防火墙

```
apt-get install ufw
ufw allow 22
ufw allow 80
ufw allow 443
ufw allow 8089
ufw allow 10327
ufw allow 10328
ufw allow 10329
ufw default deny incoming
ufw default allow outgoing
ufw status verbose
ufw enable
```

查看配置状态：`ufw status`


## 安装测试工具 
` apt-get install apache2-utils `
测试命令：
` ab -r -n 1000 -c 200 http://47.101.187.60/ `

## 安装zsh

apt-get install zsh nginx mongodb redis-server git 

oh-my-zsh 配置(方便使用命令行的配置)
	
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh