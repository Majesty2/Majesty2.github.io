// 全局通用的一些函数或一开始要执行的全局代码
function $(el){
    return document.querySelector(el);
}

function $$(el){
    return document.querySelectorAll(el);
}

function width(){
    return document.documentElement.clientWidth;
}

function height(){
    return document.documentElement.clientHeight;
}

// 通用轮播图方法
// var carouselContainerId;   //容器Id名
// var carouselDatas = [];    //展示数据

// 创建轮播图
function carousel(carouselContainerId,carouselDatas){
    //获取页面元素
    var carouselContainer = document.getElementById(carouselContainerId);
    var carouselList = carouselContainer.querySelector(".g_carousel-list");
    var carouselIndicator = carouselContainer.querySelector(".g_carousel-indicator");
    var carouselPrev = carouselContainer.querySelector(".g_carousel-prev");
    var carouselNext = carouselContainer.querySelector(".g_carousel-next");
    var nowIndex = 0;
    var len = carouselDatas.length;
    // 轮播分为 3 个步骤，静止状态--确定渲染图片、轮播中--确定显示图片、轮播完成--回到静止状态
    // 轮播又分为手动轮播、自动轮播、滑动轮播 3 种
    // 静止状态，设置当前页面应该显示的图片
    function static(){
        var carouselListHtml = "";  //轮播图列表内容
        var carouselIndicatorHtml = ""; //轮播图指示器内容
        for (var i = 0;i < len;i ++){
            data = carouselDatas[i];
            if(data.link){
                carouselListHtml += `<li> 
                                        <a href=${data.link}> 
                                            <img src=${data.image} target="_blank"> 
                                        </a> 
                                    </li>`
            }else{
                carouselListHtml += `<li> 
                                        <img src=${data.image} target="_blank">                    
                                    </li>`
            }
            carouselIndicatorHtml += `<li> </li>`;
        }
        carouselList.innerHTML = carouselListHtml;
        carouselList.style.width = `${carouselDatas.length}00%`
        carouselIndicator.innerHTML = carouselIndicatorHtml;
    }
    static();

    // 轮播中，通过轮播的图片索引来显示应该轮播显示的图片
    function rotating(){
        // 设置当前应轮播显示的页面
        carouselList.style.marginLeft = -nowIndex * width() + "px";
        // 设置轮播图指标是否选择样式
        var checked = carouselIndicator.querySelector(".selected");
        if(checked){
            checked.classList.remove("selected");
        }
        carouselIndicator.children[nowIndex].classList.add("selected");
        // 设置点击向前、向后按钮达末端的样式
        if(carouselPrev){
            if(nowIndex === 0){
                carouselPrev.classList.add("disabled");
            }else{
                carouselPrev.classList.remove("disabled");
            }
        }
        if(carouselNext){
            if(nowIndex === len - 1){
                carouselNext.classList.add("disabled");
            }else{
                carouselNext.classList.remove("disabled");
            }
        }
    }

    // 轮播完成
    function finished(){

    }

    // 手动轮播--点击向前、向后按钮，进行轮播
    function toPrev(){
        if(nowIndex === 0){
            return;  // 没有上一个，停止轮播
        }else{
            nowIndex --;
            rotating();
        }
    }
    function toNext(){
        if(nowIndex === len - 1){
            return;  // 没有下一个，停止轮播
        }else{
            nowIndex ++;
            rotating();
        }
    }
    if(carouselPrev){
        carouselPrev.onclick = toPrev;
    }
    if(carouselNext){
        carouselNext.onclick = toNext;
    }

    //自动轮播--设置计时器,一个函数
    var timer = null;
    function start(){
        if(timer){
            return;
        }
        timer = setInterval(() => {
            nowIndex ++;
            if(nowIndex === len){
                nowIndex = 0
            }
            rotating();
        }, 2000);
    }
    function stop(){
        clearInterval(timer);
        timer = null;
    }
    start();

    carouselContainer.ontouchstart = function(e){
        // 阻止事件冒泡
        e.stopPropagation();
        var x = e.touches[0].clientX;
        // 手动滑动轮播时，取消掉自动轮播
        stop();
        carouselList.style.transition = "none"
        var pressTime = Date.now();
        carouselContainer.ontouchmove = function(e){
            var distance = e.touches[0].clientX - x;
            carouselList.style.marginLeft = -nowIndex * width() + distance + "px";
            carouselContainer.ontouchend = function(e){
                var interval = Date.now() - pressTime;
                var distance = e.changedTouches[0].clientX - x;
                if(interval < 300){
                    if(distance > 20 && nowIndex > 0){
                        toPrev();
                    }else if(interval < -20 && nowIndex < len - 1){
                        toNext();
                    }
                }else{
                    if(distance < -width()/2 && nowIndex < len - 1){
                        toNext();
                    }else if(distance > width()/2 && nowIndex > 0){
                        toPrev();
                    }else{
                        rotating();
                    }
                }
                
                start();
                carouselList.style.transition = ".5s"
            }
        }
    }
}

// **封装代理请求**
async function ajax(url) {
    var reg = /http[s]?:\/\/[^/]+/;
    var matches = url.match(reg);
    if (matches.length === 0) {
      throw new Error("invalid url");
    }
    var target = matches[0];
    var path = url.replace(reg, "");
    return await fetch(`https://proxy.yuanjin.tech${path}`, {
      headers: {
        target,
      },
    }).then((r) => r.json());
  }