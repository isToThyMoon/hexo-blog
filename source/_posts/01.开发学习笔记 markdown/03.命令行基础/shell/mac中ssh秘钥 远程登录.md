---
title: mac中ssh秘钥 远程登录
categories:
  - 01.开发学习笔记 markdown
  - 03.命令行基础
  - shell
tags:
  - ssh
date:
---

# 生成秘钥
Mac 用户直接打开终端输入命令
```
ssh-keygen -C 字符串   生成一对秘钥
# 会提示你生成的文件的地址, 并且提示输入密码, 不要输入密码, 直接回车
得到了一对 ssh-key, 这是用于登录服务器用的
cat ~/.ssh/id_rsa.pub  复制这串公钥
```
id_rsa 是私钥 自己保存 不要给别人看
id_rsa.pub 是公钥, 是要到处使用的

# 利用ssh验证 安全远程登陆linux服务器：
私钥位置： 本地pc 用户目录下的 .ssh文件夹

公钥：
在服务器把本机生成的 public key内容复制添加到 /root/.ssh/authorized_keys 文件中，一行一个  
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTWq6569BribM1LS8xnWHwTKwfRPMcvrkziiAlRZ3KauQL5FUaURrQ+VqPwZdKgag/4phPR2kZq/WzfxFvmKiPk1YBRXon05YM3FMTPUZ3smP3Q+UtACSSuOAsJvhuvRAt1DNktZAWYJN0oRkb6421Mpi3CRtywOJXZhJUgu6Pgs1T/ZSsgzu9MoUiUg1TXRk/YwSOur+dhL9TNLiECgQ9ed+fLvkLH1B441ZCjonKjDrNxVHeZEYJNwnDZ2PXoa4fhOGBnrKKeY+CJTkMTZ3SE3R4RTEHPk11FDaEe4TZclZtsqe8oxGcLhnNdbit+pwY1sM7x2UGKLKfLxp9HmON gitkey

利用私钥 就可以通过本地的ssh登录到服务器

关闭明文登录：
```
cd /root
mkdir .ssh 
vim .ssh/authorized_keys

nano /etc/ssh/sshd_config
# 找到 passwordAuthentication yes 改为no
```


在客户端mac中 
配置完~/.ssh文件夹下的公私钥 需要改变权限 因为太过暴露 否则出现代码提交到远程仓库出现问题 主要是因为ssh中的私钥权限导致的

问题解决：

```
chmod -R 700 ~/.ssh/  # 只有用户可读取
```


# 延长SSH会话超时时间

SSH Server在这里就是VPS上的sshd了（Unix like的系统都有），可以通过修改sshd的配置文件来改变SSH session的超时时间：
`vim /etc/ssh/sshd_config`

然后找到下面两项：

```
ClientAliveInterval 30
ClientAliveCountMax 3
```

ClientAliveInterval：这个其实就是SSH Server与Client的心跳超时时间，也就是说，当客户端没有指令过来，Server间隔ClientAliveInterval的时间（单位秒）会发一个空包到Client来维持心跳，保证Session有效。
ClientAliveCountMax：当心跳包发送失败时重试的次数，比如现在我们设置成了3，如果Server向Client连续发三次心跳包都失败了，就会断开这个session连接。

## SSH Client端配置
除了修改Server端配置外，延长SSH Session的时间其实还可以通过修改Client端的配置来实现，这可能是更好的选择。

修改 ~/.ssh/config

```
Host myhostshortcut
     HostName myhost.com
     User root
     ServerAliveInterval 30
     ServerAliveCountMax 3
```

```
Host *
     ServerAliveInterval 30
     ServerAliveCountMax 3
```