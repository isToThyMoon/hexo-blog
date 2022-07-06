---
title: malloc
categories:
  - 01.开发学习笔记 markdown
  - 02.开发语言和计算机基础
  - c语言
---

# malloc

``` c
int *p;
p = (int*)malloc(sizeof(int) * 128);
//分配128个整型存储单元，并将这128个连续的整型存储单元的首地址存储到指针变量p中
double *pd = (double*)malloc(sizeof(double) * 12);　　
//分配12个double型存储单元，并将首地址存储到指针变量pd中
free(p);
free(pd);
p = NULL;
pd = NULL;　　
指针用完赋值NULL是一个很好的习惯。

```