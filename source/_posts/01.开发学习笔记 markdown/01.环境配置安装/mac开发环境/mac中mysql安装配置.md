---
title: mac中mysql安装配置
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
---

官网下载安装mysql

# 二、环境变量
第一步 ：在终端切换到根目录，编辑./.bash_profile文件
```
cd ~
vim ./.bash_profile
```

第二步 ：进入vim 编辑环境。 按下i 进入 insert 模式 ，输入
```
export PATH=$PATH:/usr/local/mysql/bin
export PATH=$PATH:/usr/local/mysql/support-files
```

第三步 ：按下esc 退出 insert 模式，输入:wq保存配置文件。
`:wq`

第四步 ：在终端界面下输入以下命令，让配置文件的修改生效，并查看环境变量是否设置成功
```
source ~/.bash_profile 
echo $PATH
```

## 2.1 MySQL服务的启停和状态的查看
停止MySQL服务
`sudo mysql.server stop`

重启MySQL服务
`sudo mysql.server restart`

查看MySQL服务状态
`sudo mysql.server status`


# 三、启动
第一步 ：终端界面下输入
`sudo mysql.server start`
第二步 ：启动mysql服务,启动成功后继续输入
`mysql -u root -p`
第三步 ：直接回车进入数据库，看到欢迎页面

# 四、初始化设置
设置初始化密码，进入数据库mysql数据库之后执行下面的语句，设置当前root用户的密码为root。
` set password = password('root'); `

## 4.1 退出sql界面
`exit`

# 五、配置
进入到 /usr/local/mysql/support-files 目录。里面有个文件:my-default.cnf 将其复制到桌面上，改名为my.cnf，将内容替换为。

```
[mysqld]
default-storage-engine=INNODB
character-set-server=utf8
port = 3306

[client]
default-character-set=utf8
```

将修改后的文件my.cnf复制到 /etc 目录下。

重启mysql

## 5.1 检测修改结果

```
$mysql>>>show variables like '%char%';
```