---
title: mac中anaconda3使用
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
---

# 修改镜像源：
conda info

```
# 清华源：
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
# 中科大源：
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/

conda config --set show_channel_urls yes
```

或：
user目录下生成.condarc文件 删除第三 四行 保存
```
channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
  - defaults
ssl_verify: true
show_channel_urls: true
```

---------
关于bash切换到zsh后环境变量失效  
anaconda打不开、`which python`找不到anaconda下的python3 的问题  

bash的用户级环境变量配置在~/.bash_profile 每次开机加载  
anaconda3 和 java 的环境变量配置就在.bash_profile里  

`chsh -s /bin/zsh`切换shell后  
zsh的环境变量配置在~/.zshrc里 不会去加载.bash_profile  
所以要在.zshrc里添加 path  
在bash中 echo $PATH 得到环境路径 添加到zshrc的path里  
或者在 .zshrc里加上一行source .bash_profile 每次使用时都会加载bash设定的环境变量  

-------

# 使用conda命令：  

查看conda版本
```
$ conda --version
```

更新conda版本
```
$ conda update conda
```

查看都安装了那些依赖库
```
$ conda list
```

conda包管理类似pip：
查找包
```
$ conda search XXX
```

安装包
```
$ conda install XXX
```

更新包
```
$ conda update XXX
```

删除包
```
$ conda remove XXX
```

安装到指定环境
```
$ conda install -n myenv XXX
```

# conda虚拟环境
创建新的python环境
```
$ conda create --name myenv
```

并且还可以指定python的版本
```
$ conda create -n myenv python=3.7
```

创建新环境并指定包含的库
```
$ conda create -n myenv scipy
```

并且还可以指定库的版本
```
$ conda create -n myenv scipy=0.15.0
```

复制环境
```
$ conda create --name myclone --clone myenv
```

查看是不是复制成功了
```
$ conda info --envs
```

激活、进入某个环境
```
$ source activate myenv
```

退出环境
```
$ source deactivate
```

删除环境
```
$ conda remove --name myenv --all
```

查看当前的环境列表
```
$ conda info --envs
```
or
```
$ conda env list
```

查看某个环境下安装的库
```
$ conda list -n myenv
```

# 分享环境
如果你想把你当前的环境配置与别人分享，这样ta可以快速建立一个与你一模一样的环境（同一个版本的python及各种包）来共同开发/进行新的实验。一个分享环境的快速方法就是给他一个你的环境的.yml文件。
首先通过 activate myenv 进入要分享的环境 myenv，然后输入下面的命令会在当前工作目录下生成一个environment.yml文件，

```
$ conda env export > environment.yml
```

小伙伴拿到environment.yml文件后，将该文件放在工作目录下，可以通过以下命令从该文件创建环境

```
$ conda env create -f environment.yml
```


