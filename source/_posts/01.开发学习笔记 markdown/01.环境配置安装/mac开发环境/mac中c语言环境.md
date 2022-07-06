---
title: mac中c语言环境
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
---

在 Mac OS X 下学习C语言使用 Xcode。
Xcode 是由Apple官方开发的IDE，支持C、C++、Objective-C、Swift等，可以用来开发 Mac OS X 和 iOS 上的应用程序。Xcode最初使用GCC作为编译器，后来由于GCC的不配合，改用LLVM/Clang。


编译，输入命令gcc helloword.c,此时如果电脑上没有编译工具，点击安装即可

```

gcc -v
Configured with: --prefix=/Library/Developer/

CommandLineTools/usr --with-gxx-include-dir=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/c++/4.2.1

Apple clang version 11.0.0 (clang-1100.0.20.17)

Target: x86_64-apple-darwin18.6.0

Thread model: posix

InstalledDir: /Library/Developer/CommandLineTools/usr/bin

```