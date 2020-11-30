var showPage = (function(){
    //当前显示的页面对应的索引index
var pageIndex = 0;
// 拿到所有页面元素
var pageList = $$(".page_container .page");
// 移动后，下一个页面的索引
var nextIndex = null;
// 获取页面列表长度
var len = pageList.length;
// 实现滑动效果，可拆分为 3 个状态，即静止状态、移动状态、移动完成状态
// 静止状态,设置各页面的 z-index以及 top 值，即可见度和位置
function static(){
    for(var i = 0;i < len; i++){
        // 获取每个页面
        var page = pageList[i];
        // 设置每个页面的 z-index
        page.style.zIndex = i === pageIndex ? 1 : 10;
        // 设置每个页面的 top 值
        page.style.top = (i - pageIndex) * height() +  "px";
    }
}

// 移动状态，通过给定的移动距离来显示移动页面应该展示的部分的多少
function moving(distance){
    // 移动进行时，页面应该呈现的展示情况
    for(var i = 0;i < len; i++){
        // 获取每个页面
        var page = pageList[i];
        // 移动过程中，当前展示页 top 值不变（为0），其他页面均加上一个移动距离偏移值 
        page.style.top = i != pageIndex ? (i - pageIndex) * height() + distance + "px" : 0;
    }
    // 页面下移且不为第一页，则能正常下滑
    if(distance > 0 && pageIndex > 0){
        nextIndex = pageIndex - 1;
    }else if (distance < 0 && pageIndex < len - 1) {
        // 页面上移且不为最后一页，则能正常上滑
        nextIndex = pageIndex + 1;
    } else {
        // 页面不滑动，为静止状态
        nextIndex = null;
    }
}

// 移动完成状态，通过是上移还是下移来确定当前应该显示那一页,是一个中间状态，此后应该恢复为静止状态，即 nextIndex 与 pageIndex 相等
function finished(){
    if(nextIndex === null){
        static();
        return;
    }else{
        pageList[pageIndex].style.transition = ".5s";
        pageIndex = nextIndex;
        setInterval(() => {
            static();
        }, 500);
        pageList[pageIndex].style.transition = "";
    }
}

// 滑动效果实现后，加入事件，分别对应
// 手按住---静止状态；手滑动---移动状态；手松开---移动完成状态
var pageContainer = $(".page_container")
static();
pageContainer.ontouchstart = function(e){
    y = e.touches[0].clientY
    pageContainer.ontouchmove = function(e){
        var distance = e.touches[0].clientY - y;
        // 防止误触
        // 1.直接条件判断
        // if((distance < 0 && distance > -20) || (distance > 0 && distance < 20)){
        //     distance = 0;
        // }   
        // 2.绝对值
        if(Math.abs(distance) < 20){
            distance = 0;
        }
        // console.log(distance)
        moving(distance);
        // e.preventDefault();
        pageContainer.ontouchend = function(){
            finished();
        }
    }
}

// 自动切换到某个板块,index:页面索引
function showPage(index){
    if(index != pageIndex){
        nextIndex = index;
        finished();
    }else{
        if(index ===0){
            pageIndex ++;
            // setInterval(() => {
            //     static();
            // }, 200);
            static();
        }else{
            pageIndex --;
            // setInterval(() => {
            //     static();
            // }, 200);
        }
        static();
        // 读取 dom 的尺寸和位置，会导致浏览器强行渲染
        document.documentElement.clientHeight;
    }
    nextIndex = index;
    finished();
}
return showPage;
})()