---
title: 08.css3新特性 动画等
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 02.css
  - css3
tags:
  - css
date:
---

# CSS 3

# CSS 3 中的新特性
// 应该利用 CSS 3 generator生成CSS3代码
```
border-radius 边框倒角
box text shadow 盒子阴影
transform   2D 变形
Multi Column 将文本分隔成多列

transition 动画


keyframes 动画和生成器  （高级 做出一切动画效果）
https://daneden.github.io/animate.css/
http://cssanimate.com/


其他 css3 生成器
http://css3generator.com/
http://www.css3generator.in/
http://css3.me/
https://www.tutorialspoint.com/css/css3_boarder_image.htm
```



# CSS3 动画
主要用到了 3 个属性
transform 的全部函数
https://developer.mozilla.org/en-US/docs/Web/CSS/transform

transition 可动画列表
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties

animation

------------------

CSS3 动画的套路：

transform里 translate 优先于 rorate
animationend 事件
    在动画播完后触发
    动画播放被暂停不会触发
animation iteration 事件
    在动画播放一轮后触发
    如果动画只播放一轮, 那么不会触发此事件
利用事件测试动画


按一次播放一次：

------------------


```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>fe 21 css3 animation</title>
        <style>
            .gua-block {
                background: lightblue;
                width: 100px;
                height: 100px;
            }
            .gua-spin {
                animation: spin linear 2s;
                animation-iteration-count: 1;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(160deg) translate(0, 50px);
                }
            }
        </style>
    </head>
    <body>
        <div class="gua-block">
            方块
        </div>
        <button class="play">播放动画</button>
        <script>
            var e = function(sel) {
                return document.querySelector(sel)
            }

            var playAnimation = function() {
                var animation = 'gua-spin'
                var block = e('.gua-block')
                // 让它开始播放动画
                block.classList.add(animation)
                // 绑定一个 animationend 事件, 在动画结束后删除动画 class
                block.addEventListener('animationend', function(){
                    block.classList.remove(animation)
                })
            }

            var __main = function() {
                e('.play').addEventListener('click', function(e) {
                    playAnimation()
                })
            }

            __main()
        </script>
    </body>
</html>
```