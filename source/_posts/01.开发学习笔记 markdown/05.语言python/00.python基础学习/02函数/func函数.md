---
title: python func函数
categories:
  - 01.开发学习笔记 markdown
  - 05.语言python
  - 00.python基础学习
  - 02函数
tags:
  - python
date:
---

``` python

# -*- coding: utf-8 -*-
import math


def sayhello():               # 无参数
    print("hello world")


def max(a, b):
    if a > b:
        return a
    else:
        return b


sayhello()                    # 顶格 不顶格默认是上面函数体的一部分
print(max(2, 3))




# 练习
# 请定义一个函数quadratic(a, b, c)，接收3个参数，返回一元二次方程：
# ax2 + bx + c = 0
# 的两个解。
# 提示：计算平方根可以调用math.sqrt()函数：

def quadratic(a, b, c):
    delta = b**2 - 4 * a * c
    if delta < 0:
        return
    else:
        q1 = (-b + math.sqrt(delta)) / (2 * a)
        q2 = (-b - math.sqrt(delta)) / (2 * a)
        return q1, q2


# 测试:
print('quadratic(2, 3, 1) =', quadratic(2, 3, 1))
print('quadratic(1, 3, -4) =', quadratic(1, 3, -4))

if quadratic(2, 3, 1) != (-0.5, -1.0):
    print('测试失败')
elif quadratic(1, 3, -4) != (1.0, -4.0):
    print('测试失败')
else:
    print('测试成功')


# 练习
# 以下函数允许计算两个数的乘积，请稍加改造，变成可接收一个或多个数并计算乘积：
def product(*numbers):
    s = 1
    for i in numbers:
        s = s * i
        return s


# 测试
print('product(5) =', product(5))
print('product(5, 6) =', product(5, 6))
print('product(5, 6, 7) =', product(5, 6, 7))
print('product(5, 6, 7, 9) =', product(5, 6, 7, 9))
if product(5) != 5:
    print('测试失败!')
elif product(5, 6) != 30:
    print('测试失败!')
elif product(5, 6, 7) != 210:
    print('测试失败!')
elif product(5, 6, 7, 9) != 1890:
    print('测试失败!')
else:
    try:
        product()
        print('测试失败!')
    except TypeError:
        print('测试成功!')


# 练习
# 汉诺塔的移动可以用递归函数非常简单地实现。
# 请编写move(n, a, b, c)函数，它接收参数n，表示3个柱子A、B、C中第1个柱子A的盘子数量，
# 然后打印出把所有盘子从A借助B移动到C的方法

i = 0

def move(n, a, b, c):
    global i
    if n == 1:
        i += 1
        print("第{}次移动,move {} -> {}".format(i, a, c))
        return
    move(n-1, a, c, b)
    move(1, a, b, c)
    move(n-1,b, a, c)

move(12, "A", "B", "C")

```

