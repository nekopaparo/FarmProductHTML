//header menuShow用
var menuShow = document.getElementsByClassName("menu");
function singOut(){
    //如果是登入狀態，將登入改成登出
    if(getCookieValue("singIn")){
        menuShow[2].innerHTML = '<a href="Homepage.html" onclick=delCookie("singIn")>登出</a>';
    }
    //非登入狀態，隱藏登入以外的連結
    else{
        menuShow[0].style.visibility="hidden";
        menuShow[1].style.visibility="hidden";
    }
}