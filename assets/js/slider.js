/* 幻燈片效果用 */
const sliderData = readJson.response['recommend'];
//圖片顯示時間 = slideSleep - imgSleep;
const imgSleep =  1000; //進入slideShow()1秒後圖片切換，配合透明化圖片達到幻燈片效果
const slideSleep = 5000; //進入slideShow()5秒後再次呼叫slideShow()

var t1 = t2 = null;
var imgNo = 0;

function slider()
{
    //隱藏圖片
    document.getElementById("sliderImg").className = "fadeOut";
    t1 = setTimeout(function(){
        //超過圖片範圍，從頭開始跑
        if (++imgNo == sliderData.length) { imgNo = 0; }
        imgChange();
        document.getElementById("sliderImg").className = "";
    }, imgSleep);
    
    t2 = setTimeout(slider, slideSleep);
}
//按下radio按鍵時
function radioSelect()
{
    //停止目前在跑的
    clearTimeout(t1);
    clearTimeout(t2);
    //圖片同步更換
    imgNo = document.querySelector('[name="sliderRadio"]:checked').value;
    //重新幻燈片
    imgChange();
    t2 = setTimeout(slider, slideSleep);
}
// 更換圖片
function imgChange()
{
    document.getElementById("sliderImg").src = `images/product/${sliderData[imgNo]}01.jpg`;
    document.getElementsByName("sliderRadio")[imgNo].checked = true;
}
// 跳轉網頁
function imgForward()
{
    if ( !sliderData ) return;
    document.location.href = `.?p=${sliderData[document.querySelector('input[name="sliderRadio"]:checked').value]}`;
}