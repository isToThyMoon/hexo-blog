---
title: mac中python和anaconda3
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
tags:
  - python web
date:
---

# homebrew 安装python

## homebrew安装的python位置：
/usr/local/bin/python3 -> /usr/local/Cellar/python/3.7.3/bin/python3**
## pip源
临时使用： 
可以在使用pip的时候在后面加上-i参数，指定pip源 
pip install scrapy -i https://pypi.tuna.tsinghua.edu.cn/simple/
永久修改： 
linux: 
修改 ~/.pip/pip.conf (没有就创建一个)， 内容如下：
```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```
## 一键生成项目依赖包
使用 pipreqs：（只会生成当前项目依赖包）
```
pip install pipreqs

pipreqs ./ 或 pipreqs /path/to/project
pip install -r requirements.txt
```
或者使用pip freeze：
```
pip freeze > requirements.txt

pip install -r requirements.txt
```

# 一些疑问
## mac自带python的安装位置：
/usr/bin/python2.7 ->(指向) /System/Library/Frameworks/Python.framework/Versions/2.7/bin/python2.7

/usr/bin/下还有一个/usr/bin/python可执行文件版本和上一个一样
官方建議不要對這版本進行修改與刪除，因為這是由Apple公司控制與使用或其他third-party software使用的。
猜测：这个版本的/usr/bin/python二进制文件是和/usr/lib里的python2.7文件夹共同组成一个pyhton2.7 后者是前者的库

这一点符合linux系统如ubuntu系统中内置的两个python版本逻辑：/usr/bin中有python2.7和python3.5两个二进制可执行文件，他们的库是/usr/lib的同名文件夹





# mac环境下安装anaconda3：
安装anaconda3 
anaconda自带python版本为在/Users/ayrikiya/anaconda3/bin 的python3.7
什么意思？  
bin目录下的python3.7是初始的python编译器 其他的虚拟环境都是根据这个编译器创建

base(root)的 python环境是/Users/ayrikiya/anaconda3/python.app 这个base环境就是根据bin中的python3.7编译器创建的

## Mac Anaconda 卸载
一步一步彻底卸载Anaconda：

首先安装一个包：Anaconda-Clean
`$ conda install anaconda-clean`

安装这个包也需要安装一系列其它的包，安装吧；反正后面马上都要卸载掉。

删除和Anaconda相关的文件和目录：


```
$ anaconda-clean --yes
Backup directory: /Users/Username/.anaconda_backup/2018-11-24T003019
```
但是这个会在当前用户目录下产生一个anaconda的备份文件，毫不犹豫删掉；


```
rm -rf /Users/Username/.anaconda_backup/2018-11-24T003019
```


```
cd /Applications
sudo rm -rf anaconda3  # 这里只是替身

rm -rf ~/anaconda3
```
最后到环境路径中删除anaconda3的路径设置

```
$ vi ~/.bash_profile
```

删除Python3.7设置的环境路径，如下部分：


```
# added by Anaconda3 5.3.0 installer\# >>> conda init >>>\# !! Contents within this block are managed by 'conda init' !!__conda_setup="$(CONDA_REPORT_ERRORS=false '/anaconda3/bin/conda' shell.bash hook 2> /dev/null)"if [ $? -eq 0 ]; then
    \eval "$__conda_setup"else
    if [ -f "/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/anaconda3/etc/profile.d/conda.sh"
        CONDA_CHANGEPS1=false conda activate base    else
        \export PATH="/Users/ayrikiya/anaconda3/bin:$PATH"
    fifi
```

## 安装anaconda3教程
就一条命令
brew cask install anaconda
如果环境变量没有添加，请手动添加
vi ~/.bash_profile
添加
export PATH="/usr/local/anaconda3/bin:$PATH"
刷新环境变量
source ~/.bash_profile

HomeBrew cask没有提供更新软件的命令，所以我们更新软件得先卸载再安装
命令如下

```
brew cask uninstall APP && brew cask install APP
```