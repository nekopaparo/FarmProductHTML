var recommend = `
<!--產品推薦-->
<div id="commodity">
    <img id="sliderImg" onclick="imgForward()">
</div>
<!--按鈕-->
<div id="sliderRadio">
    <script>
        for(var i=0; i<imgPath.length; i++){
            document.write('<div><input name="sliderRadio" type="radio" onclick="radioSelect()" value="'+ i +'"></div>');
        }
    </script>
</div>
<hr>
<script>slideShow()</script>
`
//幻燈片效果用
var images = 0;
//圖片顯示時間 = slideSleep - imgSleep;
var imgSleep =  1000; //進入slideShow()1秒後圖片切換，配合透明化圖片達到幻燈片效果
var slideSleep = 5000; //進入slideShow()5秒後再次呼叫slideShow()

function slideShow(){
    //隱藏圖片
    document.getElementById("sliderImg").className = "fadeOut";
    t1 = setTimeout(function(){
            document.getElementById("sliderImg").src = imgPath[images];
            document.getElementById("sliderImg").className = "";       
            document.getElementsByName("sliderRadio")[images].checked = true; 
            images++;
        },imgSleep);
    //超過圖片範圍，從頭開始跑
    if (images == imgPath.length) { images = 0; }
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