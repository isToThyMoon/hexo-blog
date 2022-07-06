---
title: ubuntu shell
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - shell
---

# 运行脚本
在shell脚本中倒引号`键盘数字1左边那个键按下的这个符号`和`$()`都可以完成命令代换，即将对倒引号或`$()`里的内容先进行执行，然后将执行的结果代换到当前命令中。

# 运行命令
linux中
类似输入python这样直接安装后直接运行的指令 一般是系统自带的（类似快捷方式） 存在 /usr/bin下
同级的bin目录和lib是一对的 lib中存放bin里二进制执行文件对应需要的库文件。


linux命令行中输入一个命令 会按照`别名（alias）>内部命令>外部命令：hash   再  Path`的顺序执行
也就是说当一条命令执行时：
1.先去判断它是否是别名
2.判段命令是否是内部命令
3.看哈希表是否为空，若不为空，则去hash表中指定的路径查找
4.若以上三步都不执行，则按照path路径挨个查找。

# 安装zsh

apt-get install zsh nginx mongodb redis-server git 

oh-my-zsh 配置(方便使用命令行的配置)
	
wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh