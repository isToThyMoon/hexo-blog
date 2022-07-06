---
title: mac中java环境搭建
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
tags:
  - java
date:
---

# 官网下载安装包

# 查看刚刚java的安装路径

```
cd /usr/libexec/
# 注意其中V是大写的
./java_home -V

Matching Java Virtual Machines (1):
10.0.2, x86_64:	"Java SE 10.0.2"	/Library/Java/JavaVirtualMachines/jdk-10.0.2.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/jdk-10.0.2.jdk/Contents/Home
```

# 配置PATH和CLASSPATH

```
# 管理员权限打开配置文件
sudo vim /etc/profile
password: xxxxxxx

# 点击 i 进入编辑模式
JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-10.0.2.jdk/Contents/Home"
CLASS_PATH="$JAVA_HOME/lib"
PATH=".:$PATH:$JAVA_HOME/bin"

# esc退出编辑模式，强制保存退出
:wq!

# 使配置生效
source /etc/profile

# 查看环境变量
echo $JAVA_HOME
echo $PATH
echo $CLASS_PATH
```

# 测试

```
# 进入文档目录，创建经典的helloworld
cd Documents/
vi HelloWorld.java
# 进入编辑模式，输入如下内容
class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
# 编译
javac HelloWorld.java
# 执行
java HelloWorld
# 会输出如下结果，至此java环境配置完成
Hello World!
```
