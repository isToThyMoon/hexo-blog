---
title: linux下python3安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
date:
---

2 3都在/usr/bin/ 建议自编译安装3

# 默认安装的两个python版本
ubuntu16.04默认中已有python2.7 python3.5：

/usr/bin中有python2.7和python3.5两个二进制可执行文件，他们的库是/usr/lib的同名文件夹

/usr/bin/python 软连接 用alternatives命令切换指向/usr/bin/python2和python3
/usr/bin/python2 软连接 指向 /usr/bin/python2.7  python2.7安装在/usr/lib
/usr/bin/python3 软连接 指向 /usr/bin/python3.5  python3.5安装在/usr/lib

# 推荐最佳安装方法：官网编译包编译安装最新版Python
地址 `https://www.python.org/downloads/source/`

下载包（文件会在当前路径下）：
`wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz`

解压：
`tar zxvf Python-3.7.3.tgz`

先安装编译环境：
`sudo apt-get install zlib1g-dev libbz2-dev libssl-dev libncurses5-dev libsqlite3-dev libreadline-dev tk-dev libgdbm-dev libdb-dev libpcap-dev xz-utils libexpat1-dev liblzma-dev libffi-dev libc6-dev`

进入解压包：
`cd Python-3.7.3 `

设置安装地址：
`./configure --prefix=/usr/bin/python3.7 --enable-optimizations`

编译 安装：

```
sudo make
sudo make install
```

设为默认Python：

```
sudo rm /usr/bin/python
sudo ln -s /usr/bin/python3.7/bin/python3.7 /usr/bin/python
```
或者：

```
#首先把之前的软连接删除：
rm -rf /usr/bin/python3
rm -rf /usr/bin/pip3

或者 unlink /usr/bin/python3

#然后创建新的软连接：
#添加python3的软链接
ln -s /usr/bin/python3.7/bin/python3.7 /usr/bin/python3
#添加 pip3 的软链接
ln -s /usr/bin/python3.7/bin/pip3.7 /usr/bin/pip3
```

# apt安装（不推荐）：
```
apt install python3  一般不安装 linux服务器自带了python3 
```

# 虚拟环境
apt install python3-venv

# 给系统python3 安装pip3
`apt-get install python3-pip`   linux的python3没有自带pip3 所以要安装pip3
```
$ pip --version
pip 20.0.2 from /usr/local/lib/python2.7/dist-packages/pip (python 2.7)
$ pip3 --version
pip 18.1 from /usr/lib/python3/dist-packages/pip (python 3.7)
```

注意： python3-pip 才是给 Python3 安装 pip 的，否则会给系统里的 Python2.7 安装。
这时 pip 可能版本较低，还缺少 setuptools 这个包，影响其他包的安装，我们把 pip 升级下，再把包装上：

`pip3 install --upgrade pip`

升级pip3 setuptools：
`pip3 install setuptools`

如果导入main出问题，修改：

```python
sudo nano /usr/bin/pip3
from pip import __main__
if __name__ == '__main__':
    sys.exit(__main__._main())
```
