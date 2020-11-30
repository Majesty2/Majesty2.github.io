// 弹出窗口
/*
1.普通写法
var menuAttention  = document.querySelector(".menu_attention");
var popAttention = document.querySelector("#pop_attention");
menuAttention.onclick = function(){
    popAttention.style.display = "";
}
*/
//2.封装写法

//封装弹出窗口函数
//闭包
var showPop = (function(){
    function showPop(el){
        $(el).style.display = "";
        if(el === '#pop_video'){
            var content = $(el)
            var videoDom = content.querySelector("video");
            videoDom.play();
        }
    }
    
    // 获取所有是关闭按钮
    var closeList = $$(".pop_close");
    var len = closeList.length;
    for(var i = 0;i < len;i++){
        closeList[i].onclick = function(){
            this.parentElement.parentElement.style.display = "none";
        }
    } 

    // 处理特殊行为
    var wx = $(".pop_wx");
    var qq = $(".pop_qq");
    var content = $("#pop_video");
    var close = content.querySelector(".pop_close");
    // wx、QQ 登录方式选择
    wx.onclick = function(){
        wx.classList.add("selected");
        qq.classList.remove("selected");
    }
    qq.onclick = function(){
        qq.classList.add("selected");
        wx.classList.remove("selected");
    }
    // 点击关闭按钮后，关闭弹窗与视频
    // 因为有 2 个事件，不能再次用 onclick 事件；应该用 addEventListener 监听事件
    close.addEventListener("click", function(){
        var videoDom = content.querySelector("video");
        videoDom.pause();
    })
    return showPop;
})()