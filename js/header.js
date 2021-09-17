//header menuShow用
var headerMenu = document.getElementsByClassName("header-menu-isShow");
function userState(){
    //如果是登入狀態，將登入改成登出
    if(myCookie.get("userState")){
        headerMenu[0].innerHTML = '<a href="Homepage.html" onclick=myCookie.remove("userState")>登出</a>';
    }
    //非登入狀態，隱藏登入以外的連結
    else{
        headerMenu[1].style.display="none";
        headerMenu[2].style.display="none";
    }
}
/*
<header>
    <!--回到首頁-->
    <div id="header-home">
        <a href="Homepage.html"><img src="./images/home_removebg.png"></a>
    </div>
    <!--其他功能-->
    <div id="header-menu">
        <div class="header-menu-isShow"><a href="SignIn.html">登入</a></div>
        <div class="header-menu-isShow"><a href="UserHome.html">會員管理</a></div>
        <div class="header-menu-isShow"><a href="BuyCar.html">購物車</a></div>
    </div>
    <script>userState();</script>
</header>
*/