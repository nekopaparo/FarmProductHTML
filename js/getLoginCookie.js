//前端模擬登入用，會用到Cookie.js
function getLoginCookie(){
    var username = document.getElementById("usernameId").value;
    var passwd = document.getElementById("passwdId").value;
    if(username == "root" && passwd == "1234"){
        addCookie("userState", true); //已登入身分
        document.location.href = "Homepage.html";
        return false;
    }
    else{
        //root沒成功會去找userID的資料
        var login = false;
        if(document.cookie.match(username+",")){
            var userID = getCookieValue("userID").split(username+",");
            //同帳號密碼不同
            userID.forEach(function(item, i){
                if(i>0){
                    var userPasswd = getCookieValue(item.split(":")[0]).split(":")[0];
                    //核對userID的密碼
                    if(passwd == userPasswd){
                        addCookie("userState", true); //已登入身分
                        login = true;
                        return false; 
                    }
                }
            });
        }
        //userID已成功驗證，離開function
        if(login){
            document.location.href = "Homepage.html";
            return false; 
        }
        //驗證都失敗
        addCookie("userState", false); //登入失敗視窗用
        document.location.href = "SignIn.html";
        return false;
    }
}
