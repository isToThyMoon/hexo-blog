---
title: jquery实现轮播图
categories:
  - 01.开发学习笔记 markdown
  - 07.前端
  - 01.html
  - jquery
---

![屏幕快照 2020-01-02 下午4.34.53](http://md.summeres.site/note/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202020-01-02%20%E4%B8%8B%E5%8D%884.34.53.png) 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>轮播图</title>

    <style>
        .img-wrapper{
            display: flex;
            transition: all 0.5s;
        }

        .img-window{
            border: 10px solid whitesmoke;
            width: 500px;
            overflow: hidden;
            margin: 0 auto;
        }
        #buttons{
            text-align: center;
        }

        .silk{
            color:cornsilk;
        }
    </style>


</head>
<body>
    <div class="img-window"> 
        <div class="img-wrapper">
            <img width="500" src="http://img5.imgtn.bdimg.com/it/u=2403611520,809506871&fm=26&gp=0.jpg" alt="">
            <img width="500" src="http://img5.imgtn.bdimg.com/it/u=3205115790,2631720219&fm=26&gp=0.jpg" alt="">
            <img width="500" src="http://img5.imgtn.bdimg.com/it/u=328917708,4158957351&fm=26&gp=0.jpg" alt="">
            <img width="500" src="http://img2.imgtn.bdimg.com/it/u=2174105867,4066103107&fm=11&gp=0.jpg" alt="">
        </div>  
    </div>
    
    <div id='buttons'>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
    </div>
    
    <script src="jquery.js"></script>
    <script src="main.js"></script>
</body>
</html>
```


```js
var $allButtons = $('button');


function activeButton($button) {
    $button.addClass('silk')
    .siblings('.silk').removeClass('silk');
}

// 点击触发轮播
for(let i = 0; i<$allButtons.length; i++) {
    $($allButtons[i]).on('click', function(e){
       var index = $(e.currentTarget).index(); //获取到事件节点在其父节点中到排行
       
       var pxvalue = index * -500;
       $('.img-wrapper').css({
           transform: 'translate('+ pxvalue +'px)'
       });
       n = index;

       activeButton($allButtons.eq(n));
    })
}

// 自动播放
var n = 0;

function setTimer() {
    return setInterval(() => {
        $allButtons.eq(n%4).trigger('click') //jquery封装元素后提供的eq函数 自动找到对应的元素并封装成jquery对象
        .addClass('silk')
        .siblings('.silk').removeClass('silk');
        // jq封装的trigger函数 用js帮你触发事件
        n += 1;
    }, 2000)
}

var intervalID = setTimer();


// 鼠标移入窗口 停止自动轮播
$('.img-window').on('mouseover', function(){
    window.clearInterval(intervalID);
})

// 鼠标移出窗口 继续自动轮播
$('.img-window').on('mouseout', function(){
    intervalID = setTimer();
})

```

