---
title: linux中python3使用
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
---

# 系统内部有多个python版本时导致的包或者app调用python错误
因为一般来说，命令文件中的`#！/usr/bin/python`指意是使用/usr/bin/python这个对应的pyhton执行自身这个命令文件。
/usr/bin/python就是指向系统默认的python版本，我们可以修改软链接让它指向python2或者pyhton3。当然当我们修改它指向自己的python3版本后，supervisord这样的命令文件中仍然指明`#！/usr/bin/python`调用，当然报错。
稳妥的办法就是修改它`#！/usr/bin/python2.7`指向bin中的python2.7，无论`/usr/bin/python`软链接指向`/usr/bin/python2.7`还是自己安装的python3.7`/usr/bin/python3`都不会影响类似supervisord这样程序的执行。

# ubuntu系统下：
`/usr/bin/`下 是python执行程序
`/usr/lib/python3/dist-packages`下 是python3对应的库 和安装的软件 如pip3 supervisor等等你通过pip安装的所有库

实测发现安装pip3 install supervisor 安装位置在：
`/usr/local/lib/python3.5/dist-packages/supervisor`
supervior的启动命令在 `/usr/local/bin`里

/usr/lib/python3.5里是基础库

在虚拟环境里 venv/bin 和 venv/lib同级 bin下是可执行文件如python pip 
lib里是通过pip安装的所有库 软件的本体

# 用alternative命令 使用python3为默认python

```
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 100
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 150
sudo update-alternatives --config python        如果要切换到Python2
```

# 创建虚拟环境
apt install python3-venv

python3 -m venv 路径

激活:  
source 路径/bin/activate

取消激活；
deactivate

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple flask flask-login flask-sqlalchemy cymysql flask-cors gevent

pip3 install flask flask-login flask-sqlalchemy cymysql flask-cors gevent gunicorn --no-cache-dir