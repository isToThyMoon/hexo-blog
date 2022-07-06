---
title: brew安装git
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
  - mac中brew的使用
---
# 安装git：
系统自带git在 /usr/bin/git --version
git version 2.20.1 (Apple Git-117)

## 替换系统中的git：

1)更新brew，使用如下命令：

$ brew update

2)舍弃原有的git-link,命令如下：

$ brew unlink git

3)更新git，使用如下命令：

$ brew install git

4)验证是否为最新版本git

$ git version

注意：如果在3）中提示 git-2.9.3 already installed, it's just not linked，请使用如下命令完成git新版本的链库，命令如下:

$ brew link git