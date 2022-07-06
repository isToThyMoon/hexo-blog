---
title: mac中shell使用
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - shell
---
mac命令行
红色 可执行文件
浅蓝色 链接文件
蓝色   文件夹
黑色   文本文件

# 运行命令
mac命令行中输入一个命令 会按照`别名（alias）>内部命令>外部命令：hash   再  Path`的顺序执行
也就是说当一条命令执行时：
1.先去判断它是否是别名
2.判段命令是否是内部命令
3.看哈希表是否为空，若不为空，则去hash表中指定的路径查找
4.若以上三步都不执行，则按照path路径挨个查找。

有的程序路径没有加入环境变量，但是设置了可执行文件的软连接，存放到环境变量里已有的路径文件夹如/usr/bin /usr/local/bin 也达到同样效果


自行安装的软件：
homebrew安装的软件位置
/usr/local/bin/xxx -> /usr/local/Cellar/xxx....

# path:

```
#.bash_profile的配置
.
/Users/ayrikiya/anaconda3/bin 
/Users/ayrikiya/anaconda3/condabin 
/Users/ayrikiya/.npm-global/bin
# .zshrc的配置
/Users/ayrikiya/bin 
# /etc/paths的配置
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
#.bash_profile的配置
/usr/local/mysql/bin 
/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home/bin
```

## .bash_profile

```#
# homebrew bottles源
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles

# node 全局安装识别path 路径
export PATH=~/.npm-global/bin:$PATH

# mysql
export PATH=${PATH}:/usr/local/mysql/bin

# added by Anaconda3 2019.03 installer
# >>> conda init >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$(CONDA_REPORT_ERRORS=false '/Users/ayrikiya/anaconda3/bin/conda' shell.bash hook 2> /dev/null)"
if [ $? -eq 0 ]; then
    \eval "$__conda_setup"
else
    if [ -f "/Users/ayrikiya/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/ayrikiya/anaconda3/etc/profile.d/conda.sh"
        CONDA_CHANGEPS1=false conda activate base
    else
        \export PATH="/Users/ayrikiya/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda init <<<


# java
JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-12.0.1.jdk/Contents/Home"
CLASS_PATH="$JAVA_HOME/lib"
PATH=".:$PATH:$JAVA_HOME/bin"
```

## path添加顺序：
mac系统的环境变量配置按以下顺序加载：
系统层级：
/etc/profile    全局共有配置 不建议修改 任意用户登录皆加载该文件
/etc/bashrc     添加系统级环境变量
/etc/paths      全局配置建议修改这个文件
用户级别：
~/.bash_profile  一般环境变量配置在这里 linux里对应是.bashrc
~/.bash_login
~/.profile
~/.bashrc

前两个环境配置在系统启动时就会加载
后面按顺序加载
如果存在.bash_profile 后面几个文件不会加载

## 关于bash切换到zsh后环境变量失效
anaconda打不开 `which python`找不到anaconda下的python3 的问题

bash的用户级环境变量配置在~/.bash_profile 每次开机加载
anaconda3 和 java 的环境变量配置就在.bash_profile里

`chsh -s /bin/zsh`切换shell后
zsh的环境变量配置在~/.zshrc里 不会去加载.bash_profile
所以要在.zshrc里添加 path
1. 在bash中 echo $PATH 得到环境路径 直接添加到zshrc的path里
    1. 或者在 .zshrc里加上一行source .bash_profile 每次使用时都会自动加载一次bash设定的环境变量（推荐 因为很多app可能自动将一些配置写入bash_profile）