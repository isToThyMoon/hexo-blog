---
title: mac中shell-zsh配置
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - shell
tags:
  - shell
  - zsh
date:
---

# mac  使用 brew 更新 zsh
`brew install zsh`

安装目录 `/usr/local/bin/zsh`

切换shell
1、在/etc/shells文件中加入如下一行
`/usr/local/bin/zsh`或者`/bin/zsh`

2、然后运行命令
`chsh -s /usr/local/bin/zsh`或者`chsh -s /bin/zsh`


安装 oh-my-zsh
`sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

打开 oh-my-zsh 配置文件 配置主题
`nano ~/.zshrc`

更新配置
`source ~/.zshrc`

自动补全插件
下载 自动补全插件 http://mimosa-pudica.net/src/incr-0.2.zsh
将插件放在 oh-my-zsh 自定义插件目录中
`~/.oh-my-zsh/plugins/incr/incr*.zsh`
chmod 777 incr-0.2.zsh


在配置文件中添加plugins
```
plugin=(
    git
    incr
)

source ~/.oh-my-zsh/plugins/incr/incr*.zsh
```

更新配置
`source ~/.zshrc`


更新：`upgrade_oh_my_zsh`
卸载： `uninstall_oh_my_zsh`


zsh 安装的时候在.oh-my-zsh 下面的 plugins 里面会有一个 autojump 文件夹里面有 autojump.plugin.zsh，直接一键 echo "$ZSH/plugins/autojump/autojump.plugin.zsh" >> ~/.zshrc

# 卡顿
在 oh-my-zsh 进入 包含 git 仓库目录时，会变的比平时慢/卡顿

原因是因为 oh-my-zsh 要获取 git 更新信息

解决办法：

设置 oh-my-zsh 不读取文件变化信息（在 git 项目目录执行下列命令）

$ git config --add oh-my-zsh.hide-dirty 1

如果你还觉得慢，可以再设置 oh-my-zsh 不读取任何 git 信息

$ git config --add oh-my-zsh.hide-status 1

okey 了，如果想恢复，设置成0就好

# 复制卡顿
但是此时的 iterm2 中复制命令特别卡
vim ~/.zshrc
添加以下代码：

```
pasteinit() {
      OLD_SELF_INSERT=${${(s.:.)widgets[self-insert]}[2,3]}
      zle -N self-insert url-quote-magic # I wonder if you'd need `.url-quote-magic`?
}

pastefinish() {
    zle -N self-insert $OLD_SELF_INSERT
}

zstyle :bracketed-paste-magic paste-init pasteinit

zstyle :bracketed-paste-magic paste-finish pastefinish
```

source一下zshrc
成功

---------

#### 关于bash切换到zsh后环境变量失效
anaconda打不开 `which python`找不到anaconda下的python3 的问题

bash的用户级环境变量配置在~/.bash_profile 每次开机加载
anaconda3 和 java 的环境变量配置就在.bash_profile里

`chsh -s /bin/zsh`切换shell后
zsh的环境变量配置在~/.zshrc里 不会去加载.bash_profile
所以要在.zshrc里添加 path
在bash中 echo $PATH 得到环境路径 添加到zshrc的path里
或者在 .zshrc里加上一行source .bash_profile 每次使用时都会加载bash设定的环境变量

#### 原因：
mac系统的环境变量配置按以下顺序加载：
系统层级：
/etc/profile    全局共有配置 不建议修改任意用户登录皆加载该文件
/etc/paths      全局配置建议修改这个文件
用户级别：
~/.bash_profile  一般环境变量配置在这里 linux里对应是.bashrc
~/.bash_login
~/.profile
~/.bashrc

前两个环境配置在系统启动时就会加载
后面按顺序加载
如果存在.bash_profile 后面几个文件不会加载


# zsh主题
ys
