(function () {
  var carouselData = [
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_1.jpg",
      },
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_2.jpg",
      },
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_3.jpg",
      },
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_4.jpg",
      },
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_5.jpg",
      },
      {
        image: "https://game.gtimg.cn/images/lolm/m/f_6.jpg",
      },
  ];
  carousel("game_carousel", carouselData)
  var gameContainer = $(".game_container");
  gameContainer.ontouchstart = function (e) {
    if(gameContainer.scrollTop >= 10){
      // 阻止事件冒泡
    e.stopPropagation();
    }
  }
}())

  