//header menuShow用
var menuShow = document.getElementsByName("menuShow");;
function singOut(){
    //如果是登入狀態，將登入改成登出
    if(getCookieValue("singIn")){
        menuShow[2].innerHTML = "登出";
        menuShow[2].href = "";
        menuShow[2].onclick = function(){delCookie("singIn");document.location.href="Homepage.html";return false;/*要加return才能使用document.location.href*/};
    }
    //非登入狀態，隱藏登入以外的連結
    else{
        menuShow[0].style.visibility="hidden";
        menuShow[1].style.visibility="hidden";
    }
}