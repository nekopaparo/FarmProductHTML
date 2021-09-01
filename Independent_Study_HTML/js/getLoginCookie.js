//前端模擬登入用，會用到Cookie.js
function getLoginCookie(){
    var usernameValue = document.getElementById("usernameId").value;
    var passwdValue = document.getElementById("passwdId").value;
    if(usernameValue == "root" && passwdValue == "1234"){
        addCookie("singIn", true); //已登入身分
        document.location.href = "Homepage.html";
        return false;
    }
    else{
        //root沒成功會去找userID的資料
        var login = false;
        if(isCookie("userID")){
            var otheruser = getCookieValue("userID").split(":");
            var userData;
            //讀取userID data
            otheruser.forEach(function(item){
                userData = getCookieValue(item).split(":");
                //核對userID的帳密
                if(usernameValue == userData[1] && passwdValue == userData[2]){
                    addCookie("singIn", "true"); //已登入身分
                    document.location.href = "Homepage.html";
                    login = true; //userID成功登入
                    return false;
                }
            });
        }
        //userID已成功登入，離開function
        if(login) return false; 

        //驗證都失敗
        addCookie("singIn", false); //登入失敗視窗用
        document.location.href = "SignIn.html";
        return false;
    }
}
