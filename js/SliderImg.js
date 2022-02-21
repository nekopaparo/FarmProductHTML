var recommend = `
<!--產品推薦-->
<div id="commodity">
    <img id="sliderImg" onclick="imgForward()">
</div>
<!--按鈕-->
<div id="sliderRadio"></div>
<template  id="slider-Radio">
    <div>
        <input name="sliderRadio" type="radio" onclick="radioSelect()" value="">
    </div>
</template>
<hr>
<script>
    request.onload = function(){
        data = request.response['data'];
        addRadio();
        slideShow();
    };
</script>
`
var data = null;
//幻燈片效果用
var images = 0;
//圖片顯示時間 = slideSleep - imgSleep;
var imgSleep =  1000; //進入slideShow()1秒後圖片切換，配合透明化圖片達到幻燈片效果
var slideSleep = 5000; //進入slideShow()5秒後再次呼叫slideShow()

function slideShow(){
    //隱藏圖片
    document.getElementById("sliderImg").className = "fadeOut";
    t1 = setTimeout(function(){
            document.getElementById("sliderImg").src = `images/product/${data[images].number}01.jpg`;
            document.getElementById("sliderImg").className = "";       
            document.getElementsByName("sliderRadio")[images].checked = true; 
            images++;
        },imgSleep);
    //超過圖片範圍，從頭開始跑
    if (images == data.length) { images = 0; }
    t2 = setTimeout(slideShow, slideSleep);
}
//當有人按下radio按鍵時
function radioSelect(){
    //圖片同步更換
    images = document.querySelector('[name="sliderRadio"]:checked').value;
    //停止目前在跑的
    clearTimeout(t1);
    clearTimeout(t2);
    //重新幻燈片
    slideShow();
}
//
function addRadio(){
    // 透過檢查 HTML template 元素屬性的存在與否，以測試瀏覽器是否支援它
    if ('content' in document.createElement('template')) {
        var tmp = document.querySelector('#slider-Radio');
        var tag = tmp.content.querySelector("input");
        var addpath = document.querySelector("#sliderRadio");
        for(var i=0; i<data.length; i++){
            tag.value = i;
            // 複製新的radio並將其新增至sliderRadio
            var clone = document.importNode(tmp.content, true);
            addpath.appendChild(clone);
        }
    } else {
        // 因為 HTML template 不被支援，所以要用其他方法在表格增加新行
    }
}
//跳轉網頁
function imgForward(){
    var lastChange;
    if(images == 0){
        lastChange = data.length - 1;
    }
    else{
        lastChange = images - 1;
    }
    SELECT_all_FROM_Commodity_WHERE_Commodity_id_productID(data[lastChange].number); //MySQL
}