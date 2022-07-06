---
title: linux下mysql安装
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - linux软件使用
  - python web服务器端相关工具安装配置
tags:
  - python web
---

apt-get remove 会删除软件包而保留软件的配置文件
apt-get purge 会同时清除软件包和软件的配置文件

但是为什么重新安装会失败呢？
系统中存在dpkg这么一个工具，会记录软件包的状态，不只是安装和未安装两种状态。

当执行apt-get install时，apt软件包管理工具会先检查要安装的软件的状态，向我这种情况下，手动删除了软件配置后，并不会引起dpkg中记录的状态的改变，即仍为 config-files 状态，所以安装过程会直接跳过创建配置文件这一过程。于是当软件想要启动进程的时候，才发现找不到文件。


!!!!注意512内存的小肉鸡根本带不动mysql加上其他一堆软件 更别提mysql8.0

# 完全卸载mysql5.7
sudo rm /var/lib/mysql/ -R
sudo rm /etc/mysql/ -R
sudo apt-get autoremove --purge mysql-server mysql-client
sudo apt-get remove mysql-common apparmor

sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-get dist-upgrade

sudo apt -y purge mysql*
sudo apt -y autoremove
reboot

sudo apt -y install mysql-server

# 安装8.0

wget "https://dev.mysql.com/get/mysql-apt-config_0.8.15-1_all.deb"

sudo dpkg -i mysql-apt-config_0.8.15-1_all.deb

sudo apt update

`apt install mysql-server mysql-common`


配置文件：/etc/mysql/mysql.conf.d/mysqld.cnf
## 配置远程连接

注意，每条sql命令结尾必需要有 `;` 表示语句结束


`/etc/mysql/mysql.conf.d/mysqld.cnf`
将bind-address = 127.0.0.1注释掉，bind-address代表允许访问的host，允许连接的IP地址。

主配置文件在`/etc/mysql/my.cnf` 配置其他数据使用

`mysql -u root -p`
连接mysql

`use mysql`
选择使用数据库mysql 这里保存了包括user信息的数据


关闭mysql，这里推荐如下命令，也是官方推荐的，当然你kill进程也是莫得问题的
sudo service mysql stop

重启mysql
sudo service mysql start


# 改密码
mysql密码存储在'mysql' database下的user表里。

use mysql;

update mysql.user set authentication_string=PASSWORD('ss0621'), plugin='mysql_native_password' where user='root';

flush privileges;

### 方法一：
给root授予在任意主机（%）访问任意数据库的所有权限。

允许MySQL数据库被远程连接
编辑vim /etc/mysql/mysql.conf.d/mysqld.cnf 配置文件，注释bind-address = 127.0.0.1这一行，然后重启MySQL服务。

或：
```
grant all privileges on *.* to 'root'@'%' identified by 'ss0621' with grant option;
```

这种方法会在数据库mysql的表user中，增加一条记录。如果不想增加记录，只是想把某个已存在的用户（例如root）修改成允许远程主机访问，则可以使用方法二。

### 方法二：

```
update user set host='localhost' where user='root';

update user set host='%' where user='root';
```


`exit;`

重启数据库生效：

```
sudo service mysql restart
```



