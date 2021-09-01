function showCookie(){
    const cookie = document.cookie;
    alert(cookie);
}
//cookieName已存在時，舊的會被刪除並從最後面加入
function addCookie(cookieName, cookieValue){
    document.cookie = cookieName + "=" + cookieValue + ";  max-age=1800"; //max-age=1800 -> cookie 30分鐘後失效 
}
function addCookie(cookieName, cookieValue, path){
    document.cookie = cookieName + "=" + cookieValue + "; path=" + path + "; max-age=1800";//path -> 指定誰有讀取權限
}
//cookieName是否存在
function isCookie(cookieName){
    if(cookieName.length != 0 && document.cookie.match(cookieName)){
        return true;
    }
    else{
        return false;
    }
}
//得到value
function getCookieValue(cookieName) {
    if(isCookie(cookieName)){
        return document.cookie.split(cookieName + "=")[1].split(";")[0];
    } else{
        return false; 
    } 
}
function getCookieInnerValue(cookieName, key){
    var value = getCookieValue(cookieName);
    if( value != false){
        return value.split(key);
    }
    else{
        return false;
    }
}
function delCookie(cookieName){
    document.cookie = cookieName + "=" + "; max-age=1";
}
function delCookie(cookieName, cookiePath){
    document.cookie = cookieName + "=" + "; path=" + cookiePath + "; max-age=1";
}
/*參考 https://shubo.io/cookies/
function getCookie() {
    var name = prompt("請輸入cookieName:");
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) alert(parts.pop().split(';').shift());
}
*/