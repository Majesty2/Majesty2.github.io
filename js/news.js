(function(){
  var carouselDatas = [
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=8584324486918752329&amp;e_code=492513&amp;idataid=279688",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191015/80cbdbaff4a1aa009f61f9240a910933.jpeg",
    },
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=13355407427466544705&amp;e_code=492506&amp;idataid=279689",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191015/696545e262f2cbe66a70f17bf49f81e0.jpeg",
    },
    {
      link:
        "https://lolm.qq.com/m/news_detail.html?docid=15384999930905072890&amp;e_code=492507&amp;idataid=279690",
      image:
        "https://ossweb-img.qq.com/upload/adw/image/20191018/3c910d44898d7221344718ef3b7c0a7e.jpeg",
    },
  ];
  carousel("news_carousel", carouselDatas)

  // 新闻数据--从 Tencent 的服务器获取新闻数据
}())
  ajax(
      "https://apps.game.qq.com/cmc/cross?serviceId=166&source=web_pc&filter=channel&chanid=4897&typeids=1&limit=4&start=0&sortby=sIdxTime"
      ).then(function (resp) {
          // 拿到数据，获取每个新闻
          var newsList = resp.data.items;
          var len = newsList.length;
          var newsHtml = "";
          var newsUl = $(".news_list")
          for(var i = 0;i < len;i ++){
              var news = newsList[i];
              var type = news.sTagInfo.split(",")[0].split("|")[1];
              newsHtml += `
                          <li>
                              <span>${type}</span>
                              <p>${news.sIdxTime}</p>
                              <a href="https://lolm.qq.com/m/news_detail.html?docid=${news.iDocID}" target="_blank">
                              ${news.sTitle}
                              </a>
                          </li> 
                          `
          }
          newsUl.innerHTML = newsHtml;
      }
  )
