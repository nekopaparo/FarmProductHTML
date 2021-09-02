//header menuShow用
var headerMenu = document.getElementsByClassName("header-menu-isShow");
function userState(){
    headerMenu[1].style.display="none";//還未做好先隱藏
    //如果是登入狀態，將登入改成登出
    if(getCookieValue("userState")){
        headerMenu[0].innerHTML = '<a href="Homepage.html" onclick=delCookie("userState")>登出</a>';
    }
    //非登入狀態，隱藏登入以外的連結
    else{
        headerMenu[1].style.display="none";
        headerMenu[2].style.display="none";
    }
}