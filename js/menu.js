//菜单切换功能
(function(){
    var menuSwitch = $(".menu_switch");
    var menuNav = $(".menu_nav");
    menuSwitch.onclick = menuChange;
    function menuChange(){
        menuSwitch.classList.toggle("menu_switch--open");
        menuNav.classList.toggle("menu_nav--open");    
    }
    var menuAttention = $(".menu_attention");
    menuAttention.onclick = function(){
        showPop("#pop_attention");
    }
    $(".menu_nav").addEventListener("click",function(){
        menuChange();
    })
}())



